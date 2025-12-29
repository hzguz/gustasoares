import React from 'react';
import Button from './Button';
import { Home, AlertTriangle } from 'lucide-react';
import Reveal from './Reveal';

interface NotFoundProps {
    onHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onHome }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafa] relative overflow-hidden text-black selection:bg-black selection:text-white">
            {/* Background Noise & Effects */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-multiply" />

            {/* Black Plasma Effect (Luz Preta) - Floating Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black opacity-[0.04] blur-[100px] rounded-full pointer-events-none animate-blob mix-blend-multiply" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-t from-neutral-300/30 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />

            {/* Glitch Overlay (Subtle inverted) - Removed Horizontal Line */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                {/* Removed the 1px bg-black line */}
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">

                <h1 className="relative font-syne font-bold text-[120px] md:text-[200px] leading-none tracking-tighter select-none mb-12">
                    <span className="relative inline-block animate-glitch-text text-black">
                        404
                        <span className="absolute top-0 left-0 -ml-[2px] text-neutral-400 opacity-70 animate-glitch-2 mix-blend-multiply" aria-hidden="true">404</span>
                        <span className="absolute top-0 left-0 ml-[2px] text-neutral-600 opacity-70 animate-glitch-3 mix-blend-multiply" aria-hidden="true">404</span>
                    </span>
                </h1>

                <Reveal variant="fade-up" delay={100}>
                    <h2 className="font-syne font-bold text-2xl md:text-4xl mb-6 text-black tracking-tighter">
                        Sinal não Encontrado
                    </h2>
                </Reveal>

                <Reveal variant="fade-up" delay={200}>
                    <p className="font-manrope text-neutral-500 max-w-md mx-auto mb-12 text-sm md:text-base leading-relaxed">
                        A página que você procura desvaneceu na luz branca.
                    </p>
                </Reveal>

                <Reveal variant="fade-up" delay={300}>
                    <Button onClick={onHome} variant="primary" className="gap-2 px-10 py-5 text-sm bg-black text-white hover:bg-neutral-800 border-none rounded-full shadow-xl shadow-black/10">
                        <Home size={18} />
                        Restaurar Conexão
                    </Button>
                </Reveal>

            </div>

            {/* Embedded Styles for Glitch Animations */}
            <style>{`
        @keyframes glitch-1 {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes glitch-text {
          0% { transform: skew(0deg); }
          20% { transform: skew(-2deg); }
          40% { transform: skew(2deg); }
          60% { transform: skew(0deg); }
          80% { transform: skew(1deg); }
          100% { transform: skew(0deg); }
        }
         @keyframes blob {
          0% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-30%, -60%) scale(1.1); }
          66% { transform: translate(-70%, -40%) scale(0.9); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        .animate-glitch-1 {
           animation: glitch-1 3s infinite linear;
        }
        .animate-glitch-text {
           animation: glitch-text 4s infinite;
        }
        .animate-blob {
            animation: blob 10s infinite;
        }
        .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
        </div>
    );
};

export default NotFound;
