import React from 'react';
import { SparklesIcon, ImageIcon } from './icons';
import { useLocalization } from '../context/LocalizationContext';

interface ResultDisplayProps {
  resultImage: string | null;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, isLoading }) => {
  const { t } = useLocalization();

  return (
    <div className="bg-gray-800/50 p-4 rounded-2xl h-full flex items-center justify-center backdrop-blur-sm border border-gray-700/50">
      <div className="w-full h-full relative flex items-center justify-center">
        {isLoading && (
          <div className="text-center text-gray-400">
            <SparklesIcon className="mx-auto h-16 w-16 text-indigo-400 animate-pulse" />
            <h3 className="mt-4 text-lg font-semibold">{t('generatingTitle')}</h3>
            <p className="mt-1 text-sm">{t('generatingSubtitle')}</p>
          </div>
        )}
        {!isLoading && resultImage && (
          <img
            src={`data:image/png;base64,${resultImage}`}
            alt="Generated result"
            className="object-contain h-full w-full rounded-lg animate-fade-in"
          />
        )}
        {!isLoading && !resultImage && (
          <div className="text-center text-gray-500">
            <ImageIcon className="mx-auto h-16 w-16" />
            <h3 className="mt-4 text-lg font-semibold">{t('placeholderTitle')}</h3>
            <p className="mt-1 text-sm">{t('placeholderSubtitle')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;