import Colors from '@/constants/Colors';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../common/Themed';
import { useCustomTheme } from '@/context/CustomThemeProvider';

const RailSelected: React.FC = () => {
  const colorScheme = useCustomTheme();
  return (
    <View
      style={[
        styles.root,
        {
          // TODO: this is where we can change the middle color when moving
          backgroundColor: Colors[colorScheme.theme].emerald500,
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
