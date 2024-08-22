import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, View } from './common/Themed';
import { useCustomTheme } from '@/context/CustomThemeProvider';

interface SortFilterButtonProps {
  iconName?: string;
  border?: boolean;
  label: string;
  selected: boolean;
  onPress: () => void;
}

// TODO: Rename this component in the future. It's not just for sorting and filtering.
const SortFilterButton: React.FC<SortFilterButtonProps> = ({
  iconName,
  border = true,
  label,
  selected,
  onPress,
}) => {
  const colorScheme = useCustomTheme();
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...(border && {
          borderWidth: 1,
          borderColor: selected
            ? Colors[colorScheme.theme].emerald500
            : Colors[colorScheme.theme].tabIconDefault,
        }),
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconLabelContainer}>
        {iconName && (
          <FontAwesome6
            size={16}
            name={iconName}
            color={Colors[colorScheme.theme].emerald500}
          />
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
      <AntDesign
        size={16}
        name={selected ? 'checkcircle' : 'checkcircleo'}
        color={Colors[colorScheme.theme].emerald500}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
