import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from './common/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ToggleButtonGroupProps {
  buttons: string[];
  initialActiveIndex?: number;
  onChange: (activeButton: string) => void;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  buttons,
  initialActiveIndex = 0,
  onChange,
}) => {
  const colorScheme = useColorScheme();
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    onChange(buttons[index]);
  };

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            {
              backgroundColor:
                activeIndex === index
                  ? Colors[colorScheme].tint
                  : 'transparent',
              borderColor: Colors[colorScheme].tint,
              borderWidth: activeIndex === index ? 0 : 1,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => handlePress(index)}
        >
          <Text
            style={{
              fontSize: 16,
              color:
                activeIndex === index
                  ? Colors.dark.text
                  : Colors[colorScheme].tint,
            }}
          >
            {button}
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
    width: '47.5%',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ToggleButtonGroup;
