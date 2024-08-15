import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from './common/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
  const colorScheme = useColorScheme();

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
              borderColor: Colors[colorScheme].tint,
              backgroundColor:
                activeIndex === index
                  ? Colors[colorScheme].tint
                  : 'transparent',
            },
          ]}
          activeOpacity={0.8}
          onPress={() => handlePress(index)}
        >
          <Text
            style={{
              color:
                activeIndex === index
                  ? Colors.dark.text
                  : Colors[colorScheme].tint,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    width: '18%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StringButtonGroup;
