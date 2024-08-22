import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import RNSelectDropdown from 'react-native-select-dropdown';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCustomTheme } from '@/context/CustomThemeProvider';

export interface Options {
  id: number;
  label: string;
  value: string;
}

interface RNDropdownSelectProps {
  data: Options[];
  placeholder?: string;
  handleSelected?: (selected: Options) => void;
}

const RNDropdownSelect: React.FC<RNDropdownSelectProps> = ({
  data,
  placeholder,
  handleSelected,
}) => {
  const colorScheme = useCustomTheme();

  const handleSelect = (selectedItem: Options, index: number) => {
    handleSelected && handleSelected(selectedItem);
  };

  const renderButton = (selectedItem: Options, isOpened: boolean) => (
    <View
      style={[
        styles.button,
        {
          backgroundColor: Colors[colorScheme.theme].dropdownBackground,
        },
      ]}
    >
      <Text
        style={[styles.buttonText, { color: Colors[colorScheme.theme].text }]}
      >
        {(selectedItem && selectedItem.label) || placeholder}
      </Text>
      <Ionicons
        name={isOpened ? 'chevron-up' : 'chevron-down'}
        size={24}
        style={[styles.icon, { color: Colors[colorScheme.theme].text }]}
      />
    </View>
  );

  const renderItem = (item: any, _index: number, isSelected: boolean) => (
    <View
      style={{
        ...styles.item,
        ...(isSelected && {
          backgroundColor: Colors[colorScheme.theme].dropdownSelected,
        }),
      }}
    >
      <Text
        style={[
          styles.itemText,
          {
            color: Colors[colorScheme.theme].text,
          },
        ]}
      >
        {item.label}
      </Text>
    </View>
  );

  return (
    <RNSelectDropdown
      data={data}
      disabled={false}
      defaultValue={null}
      onSelect={handleSelect}
      dropdownOverlayColor="transparent"
      statusBarTranslucent={Platform.OS === 'android'}
      renderButton={renderButton}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdown}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  buttonText: {
    flex: 1,
  },
  icon: {
    fontSize: 16,
  },
  item: {
    padding: 12,
  },
  itemText: {
    fontSize: 14,
    marginRight: 8,
  },
  dropdown: {
    borderRadius: 8,
  },
});

export default RNDropdownSelect;
