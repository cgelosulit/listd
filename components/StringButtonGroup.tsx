import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from './common/Themed';
import Colors from '@/constants/Colors';
import { useCustomTheme } from '@/context/CustomThemeProvider';

interface StringButtonGroupProps {
  labels: string[];
  initialActiveIndex?: number;
  onChange: (activeLabel: string) => void;
}

const StringButtonGroup: React.FC<StringButtonGroupProps> = ({
  labels,
  initialActiveIndex = 0,
  onChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const colorScheme = useCustomTheme();

  const handlePress = (index: number) => {
    setActiveIndex(index);
    onChange(labels[index]);
  };

  return (
    <View style={styles.container}>
      {labels.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            {
              borderColor: Colors[colorScheme.theme].emerald500,
              backgroundColor:
                activeIndex === index
                  ? Colors[colorScheme.theme].emerald500
                  : Colors[colorScheme.theme].background,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => handlePress(index)}
        >
          <Text
            style={{
              fontWeight: '600',
              color:
                activeIndex === index
                  ? Colors.dark.text
                  : Colors[colorScheme.theme].emerald500,
            }}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StringButtonGroup;
