import React from 'react';

export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";
export type LightingStyle = "Studio" | "Natural" | "Dramatic" | "Cinematic" | "Soft";
export type CameraPerspective = "Eye-level" | "High-angle" | "Low-angle" | "Close-up" | "Product Shot";
export type Locale = 'en' | 'ar';

export interface ImageFile {
  file: File;
  base64: string;
}

export interface LabeledOption<T> {
  value: T;
  labelKey: string;
}

export interface StylePreset {
  nameKey: string;
  icon: React.FC<{ className?: string }>;
  aspectRatio: AspectRatio;
  lightingStyle: LightingStyle;
  cameraPerspective: CameraPerspective;
}