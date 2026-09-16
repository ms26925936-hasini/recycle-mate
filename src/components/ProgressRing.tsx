import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  value?: string;
  onPress?: () => void;
}

export default function ProgressRing({
  size = 180,
  strokeWidth = 14,
  progress = 0,
  color = '#2E7D32',
  backgroundColor = '#E8F5E9',
  label,
  value,
  onPress,
}: ProgressRingProps) {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Calculate radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash offset based on progress
  const strokeDashoffset =
    circumference - (clampedProgress / 100) * circumference;

  const content = (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* SVG Circle */}
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Center content */}
      <View style={styles.centerContent}>
        <Text style={[styles.progressText, { color }]}>
          {clampedProgress}%
        </Text>
        {value && <Text style={styles.valueText}>{value}</Text>}
        {label && <Text style={styles.labelText}>{label}</Text>}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  valueText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  labelText: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});