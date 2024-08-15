import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import CurrencyInput from 'react-native-currency-input';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';

/**
  Sample use case with no delimiter and separator
  <StyledNumberInput
    name="min_sqm"
    value={null}
    placeholder="Min SQM"
    onChangeValue={(value) => console.log(value)}
  />
 */

interface StyledNumberInputProps {
  name: string;
  value: number | null;
  delimiter?: string;
  separator?: string;
  precision?: number;
  suffix?: string;
  prefix?: string;
  placeholder?: string;
  onChangeValue?: (value: number | null) => void;
}

const StyledNumberInput: React.FC<StyledNumberInputProps> = ({
  name,
  value,
  delimiter,
  separator,
  precision,
  suffix,
  prefix,
  placeholder,
  onChangeValue,
}) => {
  const colorScheme = useColorScheme();
  const [onFocus, setOnFocus] = useState(false);

  return (
    <CurrencyInput
      id={name}
      value={value}
      minValue={0}
      suffix={suffix}
      prefix={prefix}
      delimiter={delimiter}
      separator={separator}
      precision={precision || 0}
      placeholder={placeholder}
      onChangeValue={onChangeValue}
      onFocus={() => setOnFocus(true)}
      onBlur={() => setOnFocus(false)}
      placeholderTextColor={Colors[colorScheme].inputPlaceholderColor}
      renderTextInput={(props: BottomSheetTextInputProps) => (
        <BottomSheetTextInput id={name} {...props} />
      )}
      style={[
        styles.container,
        {
          color: Colors[colorScheme].text,
          borderColor: onFocus
            ? Colors[colorScheme].tint
            : Colors[colorScheme].inputBorderColor,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1.5,
  },
});

export default StyledNumberInput;
