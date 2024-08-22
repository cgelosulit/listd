import Colors from '@/constants/Colors';
import React, { memo } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { View } from '../common/Themed';
import { useCustomTheme } from '@/context/CustomThemeProvider';

const Notch: React.FC<ViewProps> = (props) => {
  const colorScheme = useCustomTheme();
  return (
    <View
      style={[
        styles.root,
        {
          borderTopColor: Colors[colorScheme.theme].emerald500,
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
