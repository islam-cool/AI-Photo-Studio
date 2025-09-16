import React from 'react';
import ImageUploader from './ImageUploader';
import { AspectRatio, LightingStyle, CameraPerspective, ImageFile, StylePreset, LabeledOption } from '../types';
import { ASPECT_RATIO_OPTIONS, LIGHTING_STYLE_OPTIONS, CAMERA_PERSPECTIVE_OPTIONS } from '../constants';
import { useLocalization } from '../context/LocalizationContext';

interface ControlPanelProps {
  aspectRatio: AspectRatio;
  setAspectRatio: (value: AspectRatio) => void;
  lightingStyle: LightingStyle;
  setLightingStyle: (value: LightingStyle) => void;
  cameraPerspective: CameraPerspective;
  setCameraPerspective: (value: CameraPerspective) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  onStyleImageUpload: (imageFile: ImageFile | null) => void;
  stylePresets: StylePreset[];
  onApplyPreset: (preset: StylePreset) => void;
}

const CustomSelect = <T extends string>({ label, value, options, onChange, id }: { label: string, value: T, options: LabeledOption<T>[], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, id: string }) => {
  const { t } = useLocalization();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
        ))}
      </select>
    </div>
  );
};


const ControlPanel: React.FC<ControlPanelProps> = ({
  aspectRatio,
  setAspectRatio,
  lightingStyle,
  setLightingStyle,
  cameraPerspective,
  setCameraPerspective,
  prompt,
  setPrompt,
  onStyleImageUpload,
  stylePresets,
  onApplyPreset
}) => {
  const { t } = useLocalization();

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl space-y-6 h-full flex flex-col backdrop-blur-sm border border-gray-700/50">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-3 text-center">{t('oneClickStyles')}</label>
        <div className="grid grid-cols-3 gap-2">
          {stylePresets.map((preset) => (
            <button
              key={preset.nameKey}
              onClick={() => onApplyPreset(preset)}
              className="flex flex-col items-center justify-center text-center p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors duration-200 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              aria-label={`Apply ${preset.nameKey} style`}
            >
              <preset.icon className="w-6 h-6 mb-1.5" />
              <span className="text-xs font-semibold">{t(preset.nameKey)}</span>
            </button>
          ))}
        </div>
      </div>
      
      <hr className="border-gray-700/50" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect<AspectRatio>
          id="aspect-ratio"
          label={t('aspectRatio')}
          value={aspectRatio}
          options={ASPECT_RATIO_OPTIONS}
          onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
        />
        <CustomSelect<LightingStyle>
          id="lighting-style"
          label={t('lightingStyle')}
          value={lightingStyle}
          options={LIGHTING_STYLE_OPTIONS}
          onChange={(e) => setLightingStyle(e.target.value as LightingStyle)}
        />
      </div>
      <CustomSelect<CameraPerspective>
        id="camera-perspective"
        label={t('cameraPerspective')}
        value={cameraPerspective}
        options={CAMERA_PERSPECTIVE_OPTIONS}
        onChange={(e) => setCameraPerspective(e.target.value as CameraPerspective)}
      />
      <ImageUploader id="style-uploader" label={t('styleImageLabel')} onImageUpload={onStyleImageUpload} />

      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">{t('generatedPrompt')}</label>
        <textarea
          id="prompt"
          rows={5}
          className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          dir="ltr"
        />
        <p className="text-xs text-gray-500 mt-1">{t('promptHint')}</p>
      </div>
    </div>
  );
};

export default ControlPanel;