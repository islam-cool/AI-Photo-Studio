import { AspectRatio, LightingStyle, CameraPerspective, StylePreset, LabeledOption } from './types';
import { StoreIcon, DiamondIcon, InstagramIcon } from './components/icons';

export const ASPECT_RATIO_OPTIONS: LabeledOption<AspectRatio>[] = [
  { value: "1:1", labelKey: "1:1" },
  { value: "16:9", labelKey: "16:9" },
  { value: "9:16", labelKey: "9:16" },
  { value: "4:3", labelKey: "4:3" },
  { value: "3:4", labelKey: "3:4" },
];

export const LIGHTING_STYLE_OPTIONS: LabeledOption<LightingStyle>[] = [
  { value: "Studio", labelKey: "Studio" },
  { value: "Natural", labelKey: "Natural" },
  { value: "Dramatic", labelKey: "Dramatic" },
  { value: "Cinematic", labelKey: "Cinematic" },
  { value: "Soft", labelKey: "Soft" },
];

export const CAMERA_PERSPECTIVE_OPTIONS: LabeledOption<CameraPerspective>[] = [
  { value: "Eye-level", labelKey: "Eye-level" },
  { value: "High-angle", labelKey: "High-angle" },
  { value: "Low-angle", labelKey: "Low-angle" },
  { value: "Close-up", labelKey: "Close-up" },
  { value: "Product Shot", labelKey: "Product Shot" },
];

export const STYLE_PRESETS: StylePreset[] = [
  {
    nameKey: 'E-commerce',
    icon: StoreIcon,
    aspectRatio: '1:1',
    lightingStyle: 'Studio',
    cameraPerspective: 'Product Shot',
  },
  {
    nameKey: 'Luxury',
    icon: DiamondIcon,
    aspectRatio: '4:3',
    lightingStyle: 'Dramatic',
    cameraPerspective: 'Close-up',
  },
  {
    nameKey: 'Instagram',
    icon: InstagramIcon,
    aspectRatio: '9:16',
    lightingStyle: 'Natural',
    cameraPerspective: 'Eye-level',
  },
];