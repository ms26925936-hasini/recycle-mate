import React from 'react';
import { Image, ImageStyle, StyleProp } from 'expo-image';

interface OptimizedImageProps {
  source: string | number;
  style?: StyleProp<ImageStyle>;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  transition?: number;
  placeholder?: string;
}

export default function OptimizedImage({
  source,
  style,
  contentFit = 'cover',
  transition = 200,
  placeholder,
}: OptimizedImageProps) {
  return (
    <Image
      source={source}
      style={style}
      contentFit={contentFit}
      transition={transition}
      placeholder={placeholder}
      cachePolicy="memory-disk"  
      priority="normal" 
    />
  );
}