import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../common/Themed';

const THUMB_RADIUS_LOW = 12;
const THUMB_RADIUS_HIGH = 16;

interface ThumbProps {
  name: 'low' | 'high';
}

const Thumb: React.FC<ThumbProps> = ({ name }) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={
        name === 'high'
          ? {
              ...styles.rootHigh,
              ...styles.thumbBg,
              borderColor: Colors[colorScheme].tint,
            }
          : {
              ...styles.rootLow,
              ...styles.thumbBg,
              borderColor: Colors[colorScheme].tint,
            }
      }
    />
  );
};

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 2,
  },
  rootHigh: {
    width: THUMB_RADIUS_HIGH * 2,
    height: THUMB_RADIUS_HIGH * 2,
    borderRadius: THUMB_RADIUS_HIGH,
    borderWidth: 2,
  },
  thumbBg: {
    backgroundColor: '#ffffff',
  },
});

export default memo(Thumb);
