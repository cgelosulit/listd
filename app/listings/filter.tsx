import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from '@/components/common/Themed';
import StringButtonGroup from '@/components/StringButtonGroup';
import { observer } from 'mobx-react-lite';
import RNPickerSelect from 'react-native-picker-select';
import { useStore } from '@/models/RootStore';
import RNDropdownSelect from '@/components/form/RNDropdownSelect';
import { useCustomTheme } from '@/context/CustomThemeProvider';
import Colors from '@/constants/Colors';
import { Configs } from '@/constants/Configs';

const FilterScreen = () => {
  const rootStore = useStore();
  const colorScheme = useCustomTheme();

  const array = [];
  const increment = 50;
  const maxValue = 50_000;

  for (let value = increment; value <= maxValue; value += increment) {
    array.push({
      label: `${value} sqm`,
      value: value,
    });
  }

  console.log(array);

  return (
    <View style={styles.container}>
      <StringButtonGroup
        initialActiveIndex={
          rootStore.propertyListingQuery.listingType === 'Buy' ? 0 : 1
        }
        labels={['Buy', 'Rent']}
        onChange={(activeLabel) =>
          rootStore.propertyListingQuery.updatePropertyListingQuery(
            'listingType',
            activeLabel as 'Buy' | 'Rent',
          )
        }
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        Property Type
      </Text>
      <RNDropdownSelect
        data={[
          {
            id: 1,
            label: 'Condominium',
            value: 'Condominium::Other',
          },
          {
            id: 2,
            label: 'House and lot',
            value: 'House::Single-family House',
          },
          {
            id: 3,
            label: 'Warehouse',
            value: 'Commercial::Warehouse',
          },
          {
            id: 4,
            label: 'Land',
            value: 'Land::Residential Lot',
          },
        ]}
        placeholder="Select property type"
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        Price
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={{ label: 'Min', value: 0 }}
          touchableWrapperProps={{
            style: {
              borderWidth: 1,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 10,
              width: Dimensions.get('window').width / 2 - 20,
              borderColor: Colors[colorScheme.theme].inputBorderColor,
            },
          }}
          items={Configs.propertyListingFilters.minPriceValues}
        />
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={{ label: 'Max', value: 2_000_000_000 }}
          touchableWrapperProps={{
            style: {
              borderWidth: 1,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 10,
              width: Dimensions.get('window').width / 2 - 20,
              borderColor: Colors[colorScheme.theme].inputBorderColor,
            },
          }}
          items={Configs.propertyListingFilters.maxPriceValues}
        />
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        Size
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={{ label: 'Min', value: 0 }}
          touchableWrapperProps={{
            style: {
              borderWidth: 1,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 10,
              width: Dimensions.get('window').width / 2 - 20,
              borderColor: Colors[colorScheme.theme].inputBorderColor,
            },
          }}
          items={Configs.propertyListingFilters.minSqmValues}
        />
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          placeholder={{ label: 'Max', value: 2_000_000_000 }}
          touchableWrapperProps={{
            style: {
              borderWidth: 1,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 10,
              width: Dimensions.get('window').width / 2 - 20,
              borderColor: Colors[colorScheme.theme].inputBorderColor,
            },
          }}
          items={Configs.propertyListingFilters.maxSqmValues}
        />
      </View>
    </View>
  );
};

export default observer(FilterScreen);

const styles = StyleSheet.create({
  container: {
    gap: 15,
    flex: 1,
    padding: 15,
  },
});
