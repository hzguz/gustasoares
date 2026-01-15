import { useState, useEffect } from 'react';

// Cache global para armazenar cores já processadas
const colorCache = new Map<string, string>();

/**
 * Extrai a cor dominante de uma imagem e calcula uma cor de contraste para bordas.
 * Usa canvas para sampling de pixels e análise de luminância.
 * Resultados são cacheados para evitar reprocessamento.
 */
export function useImageColor(imageSrc: string) {
    const [borderColor, setBorderColor] = useState<string>(() => {
        // Verificar cache imediatamente
        return colorCache.get(imageSrc) || 'rgba(17, 17, 17, 0.3)';
    });
    const [isLoaded, setIsLoaded] = useState(() => colorCache.has(imageSrc));

    useEffect(() => {
        if (!imageSrc) return;

        // Se já está no cache, não reprocessar
        if (colorCache.has(imageSrc)) {
            setBorderColor(colorCache.get(imageSrc)!);
            setIsLoaded(true);
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    setIsLoaded(true);
                    return;
                }

                // Tamanho pequeno para performance
                const sampleSize = 50;
                canvas.width = sampleSize;
                canvas.height = sampleSize;

                ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

                // Sample pixels das bordas da imagem (onde os cantos ficarão)
                const corners = [
                    { x: 2, y: 2 },                                    // top-left
                    { x: sampleSize - 3, y: 2 },                       // top-right
                    { x: 2, y: sampleSize - 3 },                       // bottom-left
                    { x: sampleSize - 3, y: sampleSize - 3 }           // bottom-right
                ];

                let totalR = 0, totalG = 0, totalB = 0;
                let validSamples = 0;

                for (const corner of corners) {
                    const imageData = ctx.getImageData(corner.x, corner.y, 5, 5);
                    const data = imageData.data;

                    for (let i = 0; i < data.length; i += 4) {
                        totalR += data[i];
                        totalG += data[i + 1];
                        totalB += data[i + 2];
                        validSamples++;
                    }
                }

                let calculatedColor = 'rgba(17, 17, 17, 0.3)';

                if (validSamples > 0) {
                    const avgR = totalR / validSamples;
                    const avgG = totalG / validSamples;
                    const avgB = totalB / validSamples;

                    // Calcular luminância relativa (fórmula WCAG)
                    const luminance = (0.299 * avgR + 0.587 * avgG + 0.114 * avgB) / 255;

                    // Se o fundo é claro, usar borda escura; se escuro, usar borda clara
                    if (luminance > 0.5) {
                        calculatedColor = 'rgba(17, 17, 17, 0.4)';
                    } else {
                        calculatedColor = 'rgba(255, 255, 255, 0.5)';
                    }
                }

                // Salvar no cache
                colorCache.set(imageSrc, calculatedColor);
                setBorderColor(calculatedColor);
                setIsLoaded(true);
            } catch {
                // Fallback silencioso em caso de CORS ou erro
                setIsLoaded(true);
            }
        };

        img.onerror = () => {
            setIsLoaded(true);
        };

        img.src = imageSrc;
    }, [imageSrc]);

    return { borderColor, isLoaded };
}

