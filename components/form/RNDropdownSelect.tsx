import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import RNSelectDropdown from 'react-native-select-dropdown';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface Options {
  id: number;
  title: string;
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
  const colorScheme = useColorScheme();

  const handleSelect = (selectedItem: Options, index: number) => {
    handleSelected && handleSelected(selectedItem);
  };

  const renderButton = (selectedItem: Options, isOpened: boolean) => (
    <View
      style={[
        styles.button,
        {
          backgroundColor: Colors[colorScheme].dropdownBackground,
        },
      ]}
    >
      <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>
        {(selectedItem && selectedItem.title) || placeholder}
      </Text>
      <Ionicons
        name={isOpened ? 'chevron-up' : 'chevron-down'}
        size={24}
        style={[styles.icon, { color: Colors[colorScheme].text }]}
      />
    </View>
  );

  const renderItem = (item: any, _index: number, isSelected: boolean) => (
    <View
      style={{
        ...styles.item,
        ...{ backgroundColor: Colors[colorScheme].dropdownBackground },
        ...(isSelected && {
          backgroundColor: Colors[colorScheme].dropdownSelected,
        }),
      }}
    >
      <Text style={[styles.itemText, { color: Colors[colorScheme].text }]}>
        {item.title}
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
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 14,
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
