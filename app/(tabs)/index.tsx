import { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import { Text, View } from '@/components/common/Themed';
import { Configs } from '@/constants/Configs';
import { imagekit } from '@/utils/imagekit';
import StringButtonGroup from '@/components/StringButtonGroup';
import { useCustomTheme } from '@/context/CustomThemeProvider';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { useStore } from '@/models/RootStore';
import { PropertyTypes } from '@/models/PropertyListingQueryModel';
import SortFilterButton from '@/components/SortFilterButton';
import { formatToCurrency } from '@/utils/format-to-currency';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const imagePath = 'public/featured_property.jpg';
const screenWidth = Dimensions.get('screen').width;

const HomepageScreen = () => {
  const router = useRouter();
  const rootStore = useStore();
  const colorScheme = useCustomTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['2.5%', '50%'], []);
  const [featuredImageClicked, setFeaturedImageClicked] = useState(false);

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          height: 300,
          width: screenWidth,
          position: 'relative',
          alignItems: 'center',
        }}
        activeOpacity={1}
        onPress={() => {
          if (!featuredImageClicked) {
            setFeaturedImageClicked(true);
          } else {
            router.push('/listings/present/1');
          }
        }}
      >
        <Image
          contentFit="cover"
          style={styles.featuredImage}
          source={{
            uri: imagekit.url({
              urlEndpoint: Configs.imageKit.urlEndpoint,
              path: imagePath,
              transformation: [
                {
                  height: '300',
                  width: String(screenWidth),
                },
              ],
            }),
          }}
        />
        {featuredImageClicked && (
          <Animated.View
            style={{
              gap: 2.5,
              padding: 14,
              width: '90%',
              opacity: 0.85,
              marginTop: 25,
              borderRadius: 8,
              position: 'absolute',
              shadowColor: Colors.dark.background,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: Colors[colorScheme.theme].background,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: Colors[colorScheme.theme].emerald500,
              }}
            >
              Premium condominiun in BGC
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: Colors[colorScheme.theme].text,
              }}
            >
              {formatToCurrency(3500000)}
            </Text>
          </Animated.View>
        )}
      </TouchableOpacity>
      <View
        style={{
          gap: 15,
          padding: 15,
          backgroundColor: Colors[colorScheme.theme].emerald100,
        }}
      >
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
        <TouchableOpacity
          style={{
            padding: 12,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: Colors.light.background,
            backgroundColor: Colors.light.background,
          }}
          activeOpacity={0.8}
          onPress={() => bottomSheetRef.current?.expand()}
        >
          <Text
            style={{
              fontWeight: '600',
              color: Colors.light.text,
            }}
          >
            {rootStore.propertyListingQuery.propertyType}
          </Text>
          <Ionicons
            name="chevron-down"
            size={24}
            style={{ fontSize: 16, color: Colors[colorScheme.theme].text }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: Colors[colorScheme.theme].emerald500,
            backgroundColor: Colors[colorScheme.theme].emerald500,
          }}
          activeOpacity={0.8}
          onPress={() => router.push('/listings')}
        >
          <Text
            style={{
              fontWeight: '600',
              color: Colors.dark.text,
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <Link href="/listings/create" asChild>
        <TouchableOpacity
          style={{
            margin: 15,
            borderWidth: 1,
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: Colors[colorScheme.theme].emerald500,
          }}
          activeOpacity={0.8}
          onPress={() => console.log('Navigate to post listing screen')}
        >
          <Text
            style={{
              fontWeight: '600',
              color: Colors[colorScheme.theme].emerald500,
            }}
          >
            Post your listing
          </Text>
        </TouchableOpacity>
      </Link>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={RenderBackdrop}
        onChange={(index) => {
          if (index === 0) {
            bottomSheetRef.current?.close();
          }
        }}
        backgroundStyle={{
          backgroundColor: Colors[colorScheme.theme].background,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors[colorScheme.theme].tabIconDefault,
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            paddingVertical: 15,
          }}
        >
          <BottomSheetFlatList
            data={PropertyTypes}
            keyExtractor={(propertyType) => propertyType}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: '100%',
                  borderTopWidth: 1,
                  borderColor: Colors[colorScheme.theme].subtleGrayBackground,
                }}
              />
            )}
            renderItem={({ item }) => (
              <SortFilterButton
                label={item}
                border={false}
                selected={rootStore.propertyListingQuery.propertyType === item}
                onPress={() => {
                  rootStore.propertyListingQuery.updatePropertyListingQuery(
                    'propertyType',
                    item,
                  );
                  bottomSheetRef.current?.close();
                }}
              />
            )}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default observer(HomepageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featuredImage: {
    width: screenWidth,
    height: 300,
  },
});
