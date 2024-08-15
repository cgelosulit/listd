import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../common/Themed';

const Rail: React.FC = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: Colors[colorScheme].tint,
        },
      ]}
    />
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
});
