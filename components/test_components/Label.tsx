import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { memo } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { Text, View } from '../common/Themed';
import { formatToCurrency } from '@/utils/formatToCurrency';

interface LabelProps extends ViewProps {
  text: number;
  currencyFormat?: boolean;
}

const Label: React.FC<LabelProps> = ({
  text,
  currencyFormat,
  ...restProps
}) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: Colors[colorScheme].tint,
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
