import React, { useRef, useState } from 'react';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { View } from '../common/Themed';

interface ImageCarouselProps {
  source: string;
}

const PAGE_WIDTH = Dimensions.get('window').width;

const ImageCarousel: React.FC<ImageCarouselProps> = ({ source }) => {
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
    <Carousel
      loop
      enabled
      ref={ref}
      data={data}
      {...baseOptions}
      autoPlay={isAutoPlay}
      pagingEnabled={isPagingEnabled}
      style={styles.carouselContainer}
      autoPlayInterval={isFast ? 100 : 2000}
      defaultScrollOffsetValue={scrollOffsetValue}
      onScrollBegin={() => null}
      onScrollEnd={() => null}
      onSnapToItem={(index) => console.log('current index:', index + 1)}
      renderItem={({ index }) => (
        <View style={styles.itemContainer}>
          <Image
            key={index}
            style={styles.image}
            source={{ uri: source }}
            cachePolicy={'memory-disk'}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageCarousel;
