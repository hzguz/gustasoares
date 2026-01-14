import React, { useCallback, useState } from 'react';
import { IconCloudUpload, IconX, IconLoader2 } from '@tabler/icons-react';
import { supabase } from '../lib/supabase';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Removed
// import { storage } from '../lib/firebase'; // Removed

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, envie apenas arquivos de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    /* 
     // Firebase storage check removed. Supabase client is mostly always defined.
    if (!storage) {
      alert('Firebase Storage não está configurado. Verifique as configurações.');
      console.error('Firebase Storage is null - check firebase.ts configuration');
      return;
    }
    */

    setIsLoading(true);

    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;
      const filePath = `uploads/${fileName}`;

      // 1. Upload to Supabase Storage 'uploads' bucket
      const { data, error: uploadError } = await supabase.storage
        .from('uploads') // Ensure this bucket exists in Supabase!
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      // 3. Pass URL to parent
      onChange(publicUrl);

    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(`Erro no upload: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary font-syne mb-2">
          {label}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full h-48 rounded-xl border-2 border-dashed transition-all duration-300 group cursor-pointer overflow-hidden
          ${isDragging
            ? 'border-inverse bg-inverse/5'
            : 'border-black/[0.1] bg-surface/50 hover:bg-surface hover:border-black/[0.2]'}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/80 backdrop-blur-sm z-20">
            <IconLoader2 className="animate-spin text-textPrimary mb-2" size={24} />
            <span className="text-xs font-manrope font-medium text-textSecondary">Enviando para o servidor...</span>
          </div>
        ) : value ? (
          <div className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <button
                onClick={handleRemove}
                className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors transform hover:scale-110 shadow-lg relative z-30"
                title="Remover imagem"
                type="button"
              >
                <IconX size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-textSecondary pointer-events-none">
            <div className={`p-4 rounded-full mb-3 transition-colors duration-300 ${isDragging ? 'bg-inverse text-white' : 'bg-white shadow-sm text-textSecondary'}`}>
              <IconCloudUpload size={24} stroke={1.5} />
            </div>
            <p className="font-syne font-bold text-sm text-textPrimary mb-1">
              {isDragging ? 'Solte para enviar' : 'Clique ou arraste a imagem'}
            </p>
            <p className="font-manrope text-xs opacity-60">PNG, JPG, WEBP (Max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
