import Colors from '@/constants/Colors';
import React, { memo } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { Text, View } from '../common/Themed';
import { formatToCurrency } from '@/utils/format-to-currency';
import { useCustomTheme } from '@/context/CustomThemeProvider';

interface LabelProps extends ViewProps {
  text: number;
  currencyFormat?: boolean;
}

const Label: React.FC<LabelProps> = ({
  text,
  currencyFormat,
  ...restProps
}) => {
  const colorScheme = useCustomTheme();
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: Colors[colorScheme.theme].emerald500,
        },
      ]}
      {...restProps}
    >
      <Text style={styles.text}>
        {currencyFormat ? formatToCurrency(text) : text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default memo(Label);
