import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, View } from './common/Themed';
import Colors from '@/constants/Colors';
import { useCustomTheme } from '@/context/CustomThemeProvider';

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
  const colorScheme = useCustomTheme();
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
                  ? Colors[colorScheme.theme].emerald500
                  : 'transparent',
              borderColor: Colors[colorScheme.theme].emerald500,
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
                  : Colors[colorScheme.theme].emerald500,
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
