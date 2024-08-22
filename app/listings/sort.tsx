import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/models/RootStore';
import { View } from '@/components/common/Themed';
import SortFilterButton from '@/components/SortFilterButton';

const SortModes = [
  {
    name: 'newest',
    rootStoreEquivalent: 'Newest',
    icon: 'clock-rotate-left',
  },
  {
    name: 'price-low-to-high',
    rootStoreEquivalent: 'Price: Low to High',
    icon: 'arrow-up-1-9',
  },
  {
    name: 'price-high-to-low',
    rootStoreEquivalent: 'Price: High to Low',
    icon: 'arrow-down-1-9',
  },
];

const SortScreen = () => {
  const rootStore = useStore();
  return (
    <View style={styles.container}>
      {SortModes.map((mode) => (
        <SortFilterButton
          selected={
            rootStore.propertyListingQuery.sortType === mode.rootStoreEquivalent
          }
          key={mode.name}
          label={mode.name}
          iconName={mode.icon}
          onPress={() =>
            rootStore.propertyListingQuery.updatePropertyListingQuery(
              'sortType',
              mode.rootStoreEquivalent as
                | 'Newest'
                | 'Price: Low to High'
                | 'Price: High to Low',
            )
          }
        />
      ))}
    </View>
  );
};

export default observer(SortScreen);

const styles = StyleSheet.create({
  container: {
    gap: 15,
    flex: 1,
    padding: 15,
  },
});
