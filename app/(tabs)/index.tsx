import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import Animated from 'react-native-reanimated';
import { Platform, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text, View } from '@/components/common/Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropertyItem from '@/components/property/PropertyItem';
import Colors from '@/constants/Colors';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { useColorScheme } from '@/hooks/useColorScheme';
import RNDropdownSelect, { Options } from '@/components/form/RNDropdownSelect';
import { useInfinitePropertyListingSearch } from '@/hooks/usePropertyListingSearch';
import CustomHeaderFilterButton from '@/components/CustomHeaderFilterButton';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import SortFilterButton from '@/components/SortFilterButton';
import RNCustomSlider from '@/components/test_components/RNCustomSlider';
import { SortMode } from '@/interface';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import StringButtonGroup from '@/components/StringButtonGroup';
import { formatToCurrency } from '@/utils/formatToCurrency';
import { config } from '@/constants/Configs';

type FilterMode =
  | 'filters'
  | 'sort'
  | 'location'
  | 'price-range'
  | 'area-range'
  | 'default';

type ListingType = 'Rent' | 'Buy' | '';

interface State {
  filterMode: FilterMode;
  sortMode: SortMode;
  bottomSheetIndex: number;
  propertyTypes: Options[];
  propertyType: string;
  listingType: ListingType;
  priceRangeLow: number;
  priceRangeHigh: number;
  sqmRangeLow: number;
  sqmRangeHigh: number;
}

const initialState: State = {
  filterMode: 'default',
  sortMode: 'id',
  bottomSheetIndex: 0,
  propertyTypes: [
    {
      id: 1,
      title: 'Condominium',
      value: 'Condominium::Other',
    },
    {
      id: 2,
      title: 'House and Lot',
      value: 'House::Single-family House',
    },
    {
      id: 3,
      title: 'Warehouse',
      value: 'Commercial::Warehouse',
    },
    {
      id: 3,
      title: 'Land',
      value: 'Land::Residential Lot',
    },
  ],
  propertyType: '',
  listingType: 'Buy',
  priceRangeLow: config.propertyQueryParams.priceRangeLow,
  priceRangeHigh: config.propertyQueryParams.priceRangeHigh,
  sqmRangeLow: config.propertyQueryParams.sqmRangeLow,
  sqmRangeHigh: config.propertyQueryParams.sqmRangeHigh,
};

type Action =
  | { type: 'SET_FILTER_MODE_OPTION'; payload: FilterMode }
  | { type: 'SET_SORT_MODE_OPTION'; payload: SortMode }
  | { type: 'SET_BOTTOM_SHEET_INDEX'; payload: number }
  | { type: 'SET_PROPERTY_TYPE'; payload: string }
  | { type: 'SET_LISTING_TYPE'; payload: ListingType }
  | { type: 'SET_PRICE_RANGE_LOW'; payload: number }
  | { type: 'SET_PRICE_RANGE_HIGH'; payload: number }
  | { type: 'SET_SQM_RANGE_LOW'; payload: number }
  | { type: 'SET_SQM_RANGE_HIGH'; payload: number }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FILTER_MODE_OPTION':
      return { ...state, filterMode: action.payload };
    case 'SET_SORT_MODE_OPTION':
      return { ...state, sortMode: action.payload };
    case 'SET_BOTTOM_SHEET_INDEX':
      return { ...state, bottomSheetIndex: action.payload };
    case 'SET_PROPERTY_TYPE':
      return { ...state, propertyType: action.payload };
    case 'SET_LISTING_TYPE':
      return { ...state, listingType: action.payload };
    case 'SET_PRICE_RANGE_LOW':
      return { ...state, priceRangeLow: action.payload };
    case 'SET_PRICE_RANGE_HIGH':
      return { ...state, priceRangeHigh: action.payload };
    case 'SET_SQM_RANGE_LOW':
      return { ...state, sqmRangeLow: action.payload };
    case 'SET_SQM_RANGE_HIGH':
      return { ...state, sqmRangeHigh: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const SAMPLE_DATA_FOR_LOADER = [
  {
    id: 4525,
    latitude: 14.5597,
    longitude: 121.021,
    primaryImageUrl:
      'https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/94c14260a47023.jpg',
    offerType: 'Rent',
    title:
      '2 BEDROOM CONDOMINIUM UNIT FOR RENT GRAND TOWER, SALCEDO VILLAGE, MAKATI',
    price: '80000.00',
    formatted_price: '₱80,000',
    area: 'Salcedo Village',
    city: 'Makati',
    region: 'Metro Manila',
    href: 'https://lamudi.com.ph/2-bedroom-condominium-unit-for-rent-grand-tower-sa-171930406291.html',
  },
  {
    id: 4526,
    latitude: 14.5548,
    longitude: 121.018,
    primaryImageUrl:
      'https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/65d2f5d2691d10.jpg',
    offerType: 'Rent',
    title: 'For Lease 2 Bedroom Fully Furnished Cattleya Gardens',
    price: '65000.00',
    formatted_price: '₱65,000',
    area: 'Legazpi Village',
    city: 'Makati',
    region: 'Metro Manila',
    href: 'https://lamudi.com.ph/for-lease-2-bedroom-fully-furnished-cattleya-garde-171895477670.html',
  },
  {
    id: 4527,
    latitude: 14.5639,
    longitude: 121.026,
    primaryImageUrl:
      'https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x396/31332322fca0f7.jpg',
    offerType: 'Rent',
    title: 'Furnished 2 Bedroom for Lease at Cosmopolitan',
    price: '75000.00',
    formatted_price: '₱75,000',
    area: 'Bel-Air',
    city: 'Makati',
    region: 'Metro Manila',
    href: 'https://lamudi.com.ph/furnished-2-bedroom-for-lease-at-cosmopolitan-170608431564.html',
  },
];

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

function PropertyListingSkeleton() {
  const colorScheme = useColorScheme();
  return (
    <MotiView
      transition={{ type: 'timing' }}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <Skeleton colorMode={colorScheme} width="100%" height={200} />
      <Spacer height={8} />
      <Skeleton colorMode={colorScheme} width={'85%'} height={20} />
      <Spacer height={8} />
      <Skeleton colorMode={colorScheme} width={'45%'} height={20} />
      <Spacer height={8} />
      <Skeleton colorMode={colorScheme} width={'60%'} height={20} />
    </MotiView>
  );
}

export default function ListScreen() {
  const colorScheme = useColorScheme();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const snapPoints = useMemo(() => {
    if (['sort', 'price-range', 'area-range'].includes(state.filterMode)) {
      return ['3%', '35%'];
    }
    return ['3%', '95%'];
  }, [state.filterMode]);

  const {
    isLoading,
    data: response,
    fetchNextPage,
  } = useInfinitePropertyListingSearch(
    {
      propertyType: state.propertyType,
      listingType: state.listingType,
      sortOrder: state.sortMode,
      priceRangeLow: state.priceRangeLow,
      priceRangeHigh: state.priceRangeHigh,
      sqmRangeLow: state.sqmRangeLow,
      sqmRangeHigh: state.sqmRangeHigh,
    },
    true,
  );

  const RenderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="collapse"
          disappearsOnIndex={0}
          appearsOnIndex={1}
        />
      );
    },
    [],
  );

  const handleSelectedPropertyType = (option: Options) => {
    dispatch({
      type: 'SET_PROPERTY_TYPE',
      payload: option.value,
    });
  };

  const handleSelectedListingType = (listingType: string) => {
    dispatch({
      type: 'SET_LISTING_TYPE',
      payload: listingType as ListingType,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.customHeaderFilterButtonContainer}>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={20}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.animatedScrollViewContentStyle}
        >
          <CustomHeaderFilterButton
            iconName="filter"
            iconType="Ionicons"
            label="Filters"
            onPress={() => {
              dispatch({
                type: 'SET_FILTER_MODE_OPTION',
                payload: 'filters',
              });
              bottomSheetRef.current?.expand();
            }}
          />

          <CustomHeaderFilterButton
            iconName="filter"
            iconType="FontAwesome"
            label="Sort"
            onPress={() => {
              dispatch({
                type: 'SET_FILTER_MODE_OPTION',
                payload: 'sort',
              });
              bottomSheetRef.current?.expand();
            }}
          />

          <CustomHeaderFilterButton
            iconName="location-sharp"
            iconType="Ionicons"
            label="Location"
            onPress={() => {
              dispatch({
                type: 'SET_FILTER_MODE_OPTION',
                payload: 'location',
              });
              bottomSheetRef.current?.expand();
            }}
          />

          <CustomHeaderFilterButton
            iconName="pricetag"
            iconType="Ionicons"
            label="Price Range"
            onPress={() => {
              dispatch({
                type: 'SET_FILTER_MODE_OPTION',
                payload: 'price-range',
              });
              bottomSheetRef.current?.expand();
            }}
          />

          <CustomHeaderFilterButton
            iconName="resize"
            iconType="Ionicons"
            label="Area Range"
            onPress={() => {
              dispatch({
                type: 'SET_FILTER_MODE_OPTION',
                payload: 'area-range',
              });
              bottomSheetRef.current?.expand();
            }}
          />
        </Animated.ScrollView>
      </View>
      <FlashList
        data={
          isLoading
            ? SAMPLE_DATA_FOR_LOADER
            : response?.pages
                .map((page) => page.data)
                .flatMap((p) => p.properties.results)
        }
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 8,
          paddingBottom: Platform.OS === 'ios' ? bottomInset : 20,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item: property }) => {
          if (isLoading) {
            return <PropertyListingSkeleton />;
          }
          return <PropertyItem property={property} />;
        }}
        onEndReached={fetchNextPage}
      />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backdropComponent={RenderBackdrop}
        onChange={(index) =>
          dispatch({ type: 'SET_BOTTOM_SHEET_INDEX', payload: index })
        }
        backgroundStyle={{
          backgroundColor: Colors[colorScheme].background,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors[colorScheme].tabIconDefault,
        }}
      >
        <BottomSheetScrollView
          scrollEnabled={
            state.filterMode === 'filters' || state.filterMode === 'default'
          }
        >
          <BottomSheetView
            style={[
              styles.bottomSheetContainer,
              {
                backgroundColor: Colors[colorScheme].background,
              },
            ]}
          >
            {(state.filterMode === 'filters' ||
              state.filterMode === 'default') && (
              <Fragment>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>Filters</Text>
                <ToggleButtonGroup
                  buttons={['Buy', 'Rent']}
                  initialActiveIndex={0}
                  onChange={handleSelectedListingType}
                />
                <RNDropdownSelect
                  data={state.propertyTypes}
                  placeholder="PROPERTY TYPE"
                  handleSelected={handleSelectedPropertyType}
                />
                <Spacer height={8} />
                <Text style={{ fontSize: 20, fontWeight: 600 }}>Sort</Text>
                <SortFilterButton
                  iconName="clock-rotate-left"
                  label="Newest"
                  selected={state.sortMode === 'newest'}
                  onPress={() =>
                    state.sortMode !== 'newest'
                      ? dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'newest',
                        })
                      : dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'id',
                        })
                  }
                />
                <SortFilterButton
                  iconName="arrow-down-1-9"
                  label="Price (low to high)"
                  selected={state.sortMode === 'price-low-to-high'}
                  onPress={() =>
                    state.sortMode !== 'price-low-to-high'
                      ? dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'price-low-to-high',
                        })
                      : dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'id',
                        })
                  }
                />
                <SortFilterButton
                  iconName="arrow-up-1-9"
                  label="Price (high to low)"
                  selected={state.sortMode === 'price-high-to-low'}
                  onPress={() =>
                    state.sortMode !== 'price-high-to-low'
                      ? dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'price-high-to-low',
                        })
                      : dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'id',
                        })
                  }
                />
                <Spacer height={8} />
                {['Condominium::Other', 'House::Single-family House'].includes(
                  state.propertyType,
                ) && (
                  <Fragment>
                    <Text style={{ fontSize: 20, fontWeight: 600 }}>
                      Bedrooms
                    </Text>

                    <StringButtonGroup
                      initialActiveIndex={0}
                      labels={['1', '2', '3', '4', '5+']}
                      onChange={(activeLabel) => null}
                    />

                    <Text style={{ fontSize: 20, fontWeight: 600 }}>
                      Bathrooms
                    </Text>

                    <StringButtonGroup
                      initialActiveIndex={0}
                      labels={['1', '2', '3', '4', '5+']}
                      onChange={(activeLabel) => null}
                    />
                  </Fragment>
                )}

                <Text style={{ fontSize: 20, fontWeight: 600 }}>
                  Price range
                </Text>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {formatToCurrency(state.priceRangeLow)}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {formatToCurrency(state.priceRangeHigh)}
                  </Text>
                </View>
                <View style={styles.rnCustomSliderContainer}>
                  <RNCustomSlider
                    formatToCurrency
                    min={config.propertyQueryParams.priceRangeLow}
                    max={config.propertyQueryParams.priceRangeHigh}
                    initialLow={state.priceRangeLow}
                    initialHigh={state.priceRangeHigh}
                    setLow={(low) => {
                      dispatch({
                        type: 'SET_PRICE_RANGE_LOW',
                        payload: low,
                      });
                    }}
                    setHigh={(high) => {
                      dispatch({
                        type: 'SET_PRICE_RANGE_HIGH',
                        payload: high,
                      });
                    }}
                  />
                </View>

                <Text style={{ fontSize: 20, fontWeight: 600 }}>
                  Area range
                </Text>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {state.sqmRangeLow} SQM
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 500 }}>
                    {state.sqmRangeHigh} SQM
                  </Text>
                </View>
                <View
                  style={[
                    styles.rnCustomSliderContainer,
                    {
                      marginBottom: Platform.OS === 'android' ? 10 : 0,
                    },
                  ]}
                >
                  <RNCustomSlider
                    min={config.propertyQueryParams.sqmRangeLow}
                    max={config.propertyQueryParams.sqmRangeHigh}
                    initialLow={state.sqmRangeLow}
                    initialHigh={state.sqmRangeHigh}
                    setLow={(low) =>
                      dispatch({
                        type: 'SET_SQM_RANGE_LOW',
                        payload: low,
                      })
                    }
                    setHigh={(high) =>
                      dispatch({
                        type: 'SET_SQM_RANGE_HIGH',
                        payload: high,
                      })
                    }
                  />
                </View>
              </Fragment>
            )}

            {state.filterMode === 'sort' && (
              <Fragment>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>Sort</Text>

                <SortFilterButton
                  iconName="clock-rotate-left"
                  label="Newest"
                  selected={state.sortMode === 'newest'}
                  onPress={() =>
                    state.sortMode !== 'newest'
                      ? dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'newest',
                        })
                      : dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'id',
                        })
                  }
                />
                <SortFilterButton
                  iconName="arrow-down-1-9"
                  label="Price (low to high)"
                  selected={state.sortMode === 'price-low-to-high'}
                  onPress={() =>
                    state.sortMode !== 'price-low-to-high'
                      ? dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'price-low-to-high',
                        })
                      : dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'id',
                        })
                  }
                />
                <SortFilterButton
                  iconName="arrow-up-1-9"
                  label="Price (high to low)"
                  selected={state.sortMode === 'price-high-to-low'}
                  onPress={() =>
                    state.sortMode !== 'price-high-to-low'
                      ? dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'price-high-to-low',
                        })
                      : dispatch({
                          type: 'SET_SORT_MODE_OPTION',
                          payload: 'id',
                        })
                  }
                />
              </Fragment>
            )}

            {state.filterMode === 'location' && (
              <Fragment>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>Location</Text>

                <View
                  style={{
                    gap: 10,
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 18 }}>
                    Failed to load map forms 🚨
                  </Text>

                  <Text style={{ fontSize: 18 }}>Rebuild required ℹ️</Text>
                </View>
              </Fragment>
            )}

            {state.filterMode === 'price-range' && (
              <Fragment>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>
                  Price range
                </Text>

                <Spacer height={8} />

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 24, fontWeight: 500 }}>
                    {formatToCurrency(state.priceRangeLow)}
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: 500 }}>
                    {formatToCurrency(state.priceRangeHigh)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.rnCustomSliderContainer,
                    {
                      height: 35,
                    },
                  ]}
                >
                  <RNCustomSlider
                    formatToCurrency
                    min={config.propertyQueryParams.priceRangeLow}
                    max={config.propertyQueryParams.priceRangeHigh}
                    initialLow={state.priceRangeLow}
                    initialHigh={state.priceRangeHigh}
                    setLow={(low) => {
                      dispatch({
                        type: 'SET_PRICE_RANGE_LOW',
                        payload: low,
                      });
                    }}
                    setHigh={(high) => {
                      dispatch({
                        type: 'SET_PRICE_RANGE_HIGH',
                        payload: high,
                      });
                    }}
                  />
                </View>
              </Fragment>
            )}

            {state.filterMode === 'area-range' && (
              <Fragment>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>
                  Area range
                </Text>

                <Spacer height={8} />

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ fontSize: 24, fontWeight: 500 }}>
                    {state.sqmRangeLow} SQM
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: 500 }}>
                    {state.sqmRangeHigh} SQM
                  </Text>
                </View>
                <View
                  style={[
                    styles.rnCustomSliderContainer,
                    {
                      height: 35,
                    },
                  ]}
                >
                  <RNCustomSlider
                    min={config.propertyQueryParams.sqmRangeLow}
                    max={config.propertyQueryParams.sqmRangeHigh}
                    initialLow={state.sqmRangeLow}
                    initialHigh={state.sqmRangeHigh}
                    setLow={(low) =>
                      dispatch({
                        type: 'SET_SQM_RANGE_LOW',
                        payload: low,
                      })
                    }
                    setHigh={(high) =>
                      dispatch({
                        type: 'SET_SQM_RANGE_HIGH',
                        payload: high,
                      })
                    }
                  />
                </View>
              </Fragment>
            )}
          </BottomSheetView>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeaderFilterButtonContainer: {
    height: 50,
    padding: 5,
  },
  animatedScrollViewContentStyle: {
    flexDirection: 'row',
    gap: 10,
  },
  bottomSheetContainer: {
    padding: 10,
    gap: 10,
  },
  rnCustomSliderContainer: {
    width: '100%',
    marginTop: 35,
  },
});
