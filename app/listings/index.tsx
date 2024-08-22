import { Link, useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '@/components/common/Themed';
import { useCustomTheme } from '@/context/CustomThemeProvider';
import Colors from '@/constants/Colors';
import { useStore } from '@/models/RootStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useInfinitePropertyListingSearch } from '@/hooks/usePropertyListingSearch';
import PropertyItem from '@/components/property/PropertyItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';

const propertyTypeMapper = {
  Condominium: 'Condominium::Other',
  'House and Lot': 'House::Single-family House',
  Warehouse: 'Commercial::Warehouse',
  Land: 'Land::Residential Lot',
};

const sortModeMapper = {
  Newest: 'newest',
  'Price: Low to High': 'price-low-to-high',
  'price-high-to-low': 'price-high-to-low',
};

const ListingsScreen = () => {
  const router = useRouter();
  const rootState = useStore();
  const colorScheme = useCustomTheme();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const {
    isLoading,
    data: response,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfinitePropertyListingSearch(
    {
      listingType: rootState.propertyListingQuery.listingType,
      propertyType:
        propertyTypeMapper[
          rootState.propertyListingQuery
            .propertyType as keyof typeof propertyTypeMapper
        ],
      sortOrder:
        sortModeMapper[
          rootState.propertyListingQuery.sortType as keyof typeof sortModeMapper
        ],
    },
    true,
  );

  useEffect(() => {
    if (isError && error) {
      Toast.show(error.message, {
        delay: 0,
        opacity: 1,
        textColor: Colors[colorScheme.theme].text,
        backgroundColor: Colors[colorScheme.theme].background,
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        containerStyle: {
          borderRadius: 8,
          marginBottom: bottomInset,
        },
        shadow: true,
        animation: true,
        hideOnPress: true,
        keyboardAvoiding: true,
      });
    }
  }, [isError, error]);

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          borderBottomWidth: 1,
          backgroundColor: Colors[colorScheme.theme].emerald500,
          borderBottomColor: Colors[colorScheme.theme].subtleGrayBackground,
        }}
      >
        <View
          style={{
            gap: 10,
            paddingTop: 5,
            paddingBottom: 10,
            paddingHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors[colorScheme.theme].emerald500,
          }}
        >
          <TouchableOpacity onPress={router.back} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={28} color={Colors.dark.text} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: Colors.dark.text,
              }}
            >
              {`${
                response?.pages?.[0].data.totalRecords || 0
              } ${rootState.propertyListingQuery.propertyType.toLowerCase()}, ${
                rootState.propertyListingQuery.listingType === 'Buy'
                  ? 'sale'
                  : 'rental'
              }`}
            </Text>
            <Text style={{ fontWeight: '700', color: Colors.dark.text }}>
              Your custom search area
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          justifyContent: 'space-between',
          borderColor: Colors[colorScheme.theme].subtleGrayBackground,
        }}
      >
        <Link href="/listings/filter" asChild>
          <TouchableOpacity
            style={{
              gap: 5,
              width: '32%',
              borderRightWidth: 1,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: Colors[colorScheme.theme].subtleGrayBackground,
            }}
          >
            <Ionicons
              size={20}
              name="filter"
              color={Colors[colorScheme.theme].text}
            />
            <Text>Filter</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/listings/sort" asChild>
          <TouchableOpacity
            style={{
              gap: 5,
              width: '32%',
              borderRightWidth: 1,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: Colors[colorScheme.theme].subtleGrayBackground,
            }}
          >
            <FontAwesome
              size={20}
              name="sort"
              color={Colors[colorScheme.theme].text}
            />
            <Text>Sort</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={{
            gap: 5,
            width: '32%',
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FontAwesome
            size={20}
            name="map-marker"
            color={Colors[colorScheme.theme].text}
          />
          <Text>Map</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={response?.pages
          .map((page) => page.data)
          .flatMap((p) => p.properties.results)}
        estimatedItemSize={300}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 8,
          paddingBottom: Platform.OS === 'ios' ? bottomInset : 20,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item: property }) => {
          return <PropertyItem property={property} />;
        }}
        onEndReached={hasNextPage ? fetchNextPage : null}
      />
    </View>
  );
};

export default observer(ListingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
