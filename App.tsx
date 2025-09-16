import React, { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ControlPanel from './components/ControlPanel';
import ResultDisplay from './components/ResultDisplay';
import { SparklesIcon } from './components/icons';
import { AspectRatio, LightingStyle, CameraPerspective, ImageFile, StylePreset } from './types';
import { editImageWithNanoBanana } from './services/geminiService';
import { STYLE_PRESETS } from './constants';
import { useLocalization } from './context/LocalizationContext';
import LanguageSwitcher from './components/LanguageSwitcher';

const App: React.FC = () => {
  const [productImage, setProductImage] = useState<ImageFile | null>(null);
  const [styleReferenceImage, setStyleReferenceImage] = useState<ImageFile | null>(null);
  
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [lightingStyle, setLightingStyle] = useState<LightingStyle>('Studio');
  const [cameraPerspective, setCameraPerspective] = useState<CameraPerspective>('Product Shot');
  
  const [prompt, setPrompt] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { t } = useLocalization();

  const applyStylePreset = (preset: StylePreset) => {
    setAspectRatio(preset.aspectRatio);
    setLightingStyle(preset.lightingStyle);
    setCameraPerspective(preset.cameraPerspective);
  };

  useEffect(() => {
    let styleDescription = 'a professional, clean, and visually appealing photo, suitable for e-commerce or marketing.';
    
    if (lightingStyle === 'Studio' && cameraPerspective === 'Product Shot' && aspectRatio === '1:1') {
      styleDescription = 'a clean product photo on a pure white background, perfect for e-commerce listings. The lighting should be even and soft, minimizing shadows.';
    } 
    else if (lightingStyle === 'Dramatic' && cameraPerspective === 'Close-up' && aspectRatio === '4:3') {
      styleDescription = 'a luxurious and elegant product shot. Use dramatic lighting to create a high-end feel with deep shadows and highlights. The background should be dark and sophisticated.';
    }
    else if (lightingStyle === 'Natural' && cameraPerspective === 'Eye-level' && aspectRatio === '9:16') {
        styleDescription = 'a vibrant and lifestyle-oriented photo suitable for Instagram. Use natural, bright lighting. The product should be in a realistic, appealing setting. The mood should be trendy and engaging.';
    }

    let newPrompt = `Generate a high-quality product photo with an aspect ratio of ${aspectRatio}.
- Photography Style: The photo should feature ${styleDescription}
- Lighting: ${lightingStyle}
- Camera Perspective: ${cameraPerspective}`;
    
    if (styleReferenceImage) {
      newPrompt += `\n- Reference Style: Emulate the overall aesthetic, color palette, mood, and composition of the provided style reference image.`;
    }

    setPrompt(newPrompt.trim().replace(/\s+/g, ' '));
  }, [aspectRatio, lightingStyle, cameraPerspective, styleReferenceImage]);

  const handleGenerate = async () => {
    if (!productImage) {
      setError(t('errorUpload'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await editImageWithNanoBanana(
        { base64: productImage.base64, mimeType: productImage.file.type },
        prompt,
        styleReferenceImage ? { base64: styleReferenceImage.base64, mimeType: styleReferenceImage.file.type } : undefined
      );
      setResultImage(generatedImage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`${t('errorPrefix')} ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 relative">
          <div className="absolute top-0 left-0">
             <LanguageSwitcher />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
            {t('appTitle')}
          </h1>
          <p className="mt-2 text-lg text-gray-400">{t('appSubtitle')}</p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Right Column in RTL */}
          <div className="flex flex-col gap-8">
            <div className="bg-gray-800/50 p-6 rounded-2xl backdrop-blur-sm border border-gray-700/50">
                <h2 className="text-2xl font-semibold mb-4 text-center">{t('uploadProductTitle')}</h2>
                <ImageUploader id="product-uploader" label={t('productImageLabel')} onImageUpload={setProductImage} />
            </div>
            
            <div className="flex-grow">
                 <h2 className="text-2xl font-semibold mb-4 text-center">{t('customizeSceneTitle')}</h2>
                <ControlPanel
                  aspectRatio={aspectRatio}
                  setAspectRatio={setAspectRatio}
                  lightingStyle={lightingStyle}
                  setLightingStyle={setLightingStyle}
                  cameraPerspective={cameraPerspective}
                  setCameraPerspective={setCameraPerspective}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onStyleImageUpload={setStyleReferenceImage}
                  stylePresets={STYLE_PRESETS}
                  onApplyPreset={applyStylePreset}
                />
            </div>

            <div className="mt-auto">
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !productImage}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <SparklesIcon className="w-6 h-6" />
                    {isLoading ? t('generatingButton') : t('generateButton')}
                </button>
            </div>
          </div>
          
          {/* Left Column in RTL */}
          <div className="min-h-[500px] lg:min-h-0">
             <h2 className="text-2xl font-semibold mb-4 text-center">{t('seeResultTitle')}</h2>
            <ResultDisplay resultImage={resultImage} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;