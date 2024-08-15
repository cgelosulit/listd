import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { memo } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { View } from '../common/Themed';

const Notch: React.FC<ViewProps> = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.root,
        {
          borderTopColor: Colors[colorScheme].tint,
        },
      ]}
      {...props}
    />
  );
};

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
