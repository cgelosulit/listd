import Colors from '@/constants/Colors';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../common/Themed';
import { useCustomTheme } from '@/context/CustomThemeProvider';

const Rail: React.FC = () => {
  const colorScheme = useCustomTheme();
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: Colors[colorScheme.theme].emerald500,
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
