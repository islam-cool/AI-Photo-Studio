import React, { useState, useRef } from 'react';
import { ImageFile } from '../types';
import { UploadIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';

interface ImageUploaderProps {
  onImageUpload: (imageFile: ImageFile | null) => void;
  label: string;
  id: string;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, label, id, className = '' }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLocalization();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setPreview(reader.result as string);
        onImageUpload({ file, base64: base64String });
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setFileName('');
      onImageUpload(null);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPreview(null);
    setFileName('');
    onImageUpload(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div
        className={`relative group flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 
          ${preview ? 'border-indigo-500' : 'border-gray-600 hover:border-indigo-500'} bg-gray-800/50 hover:bg-gray-800`}
      >
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="object-contain h-full w-full rounded-lg" />
            <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold text-indigo-400">{t('uploadAction')}</span> {t('uploadOrDrag')}
            </p>
            <p className="text-xs text-gray-500">{t('uploadHint')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;