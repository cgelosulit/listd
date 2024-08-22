import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text } from './common/Themed';
import { useCustomTheme } from '@/context/CustomThemeProvider';

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
  const colorScheme = useCustomTheme();

  const IconComponent = iconType === 'Ionicons' ? Ionicons : FontAwesome;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor: Colors[colorScheme.theme].tabIconDefault },
      ]}
      onPress={onPress}
    >
      <IconComponent
        size={22}
        name={iconName as any}
        color={Colors[colorScheme.theme].tabIconSelected}
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
