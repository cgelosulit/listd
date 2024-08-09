import { useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import {
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SBItem } from './SBItem';
import { Text, View } from '../common/Themed';

const ElementsText = {
  AUTOPLAY: 'AutoPlay',
};

const PAGE_WIDTH = Dimensions.get('window').width;

const PropertyCard = () => {
  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [data, setData] = useState([...new Array(4).keys()]);
  const [isFast, setIsFast] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = useState(true);
  const ref = useRef<ICarouselInstance>(null);

  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: windowWidth,
        height: PAGE_WIDTH / 2,
      } as const)
    : ({
        vertical: false,
        width: windowWidth,
        height: PAGE_WIDTH / 2,
      } as const);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        enabled
        ref={ref}
        data={data}
        {...baseOptions}
        autoPlay={isAutoPlay}
        style={{ width: '100%' }}
        pagingEnabled={isPagingEnabled}
        autoPlayInterval={isFast ? 100 : 2000}
        defaultScrollOffsetValue={scrollOffsetValue}
        onScrollBegin={() => console.log('===1')}
        onScrollEnd={() => console.log('===2')}
        onSnapToItem={(index) => console.log('current index:', index + 1)}
        renderItem={({ index }) => <SBItem key={index} index={index + 1} />}
      />
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            setData([...new Array(5).keys()]);
          }}
        >
          <Text>Change the data length to 5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setData([...new Array(3).keys()]);
          }}
        >
          <Text>Change the data length to 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsVertical(!isVertical);
          }}
        >
          <Text>{isVertical ? 'Set horizontal' : 'Set Vertical'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFast(!isFast);
          }}
        >
          <Text>{isFast ? 'NORMAL' : 'FAST'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsPagingEnabled(!isPagingEnabled);
          }}
        >
          <Text>PagingEnabled:{isPagingEnabled.toString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsAutoPlay(!isAutoPlay);
          }}
        >
          <Text>
            {ElementsText.AUTOPLAY}:{`${isAutoPlay}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(ref.current?.getCurrentIndex());
          }}
        >
          <Text>Log current index</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setData(
              data.length === 6
                ? [...new Array(8).keys()]
                : [...new Array(6).keys()],
            );
          }}
        >
          <Text>Change data length to:{data.length === 6 ? 8 : 6}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            ref.current?.scrollTo({ count: -1, animated: true });
          }}
        >
          <Text>prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            ref.current?.scrollTo({ count: 1, animated: true });
          }}
        >
          <Text>next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PropertyCard;
