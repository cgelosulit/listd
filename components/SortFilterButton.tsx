import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from './common/Themed';

interface SortFilterButtonProps {
  iconName: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}

const SortFilterButton: React.FC<SortFilterButtonProps> = ({
  iconName,
  label,
  selected,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderWidth: 1,
          borderColor: selected
            ? Colors[colorScheme].tint
            : Colors[colorScheme].tabIconDefault,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconLabelContainer}>
        <FontAwesome6
          size={16}
          name={iconName}
          color={Colors[colorScheme].tint}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
      <AntDesign
        size={16}
        name={selected ? 'checkcircle' : 'checkcircleo'}
        color={Colors[colorScheme].tint}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  iconLabelContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: '500',
  },
});

export default SortFilterButton;
