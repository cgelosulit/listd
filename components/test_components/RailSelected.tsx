import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../common/Themed';

const RailSelected: React.FC = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.root,
        {
          // TODO: this is where we can change the middle color when moving
          backgroundColor: Colors[colorScheme].tint,
        },
      ]}
    />
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    borderRadius: 2,
  },
});
