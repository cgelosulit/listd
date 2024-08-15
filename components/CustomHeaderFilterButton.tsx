import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text } from './common/Themed';

export type CustomHeaderFilterButtonIconType = 'Ionicons' | 'FontAwesome';

interface CustomHeaderFilterButtonProps {
  iconName: string;
  iconType: CustomHeaderFilterButtonIconType;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CustomHeaderFilterButton: React.FC<CustomHeaderFilterButtonProps> = ({
  iconName,
  iconType,
  label,
  onPress,
}) => {
  const colorScheme = useColorScheme();

  const IconComponent = iconType === 'Ionicons' ? Ionicons : FontAwesome;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor: Colors[colorScheme].tabIconDefault },
      ]}
      onPress={onPress}
    >
      <IconComponent
        size={22}
        name={iconName as any}
        color={Colors[colorScheme].tabIconSelected}
      />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    gap: 5,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
  },
});

export default CustomHeaderFilterButton;
