import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  AnimatedRef,
  runOnJS,
  scrollTo,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSortableGallery } from '@/context/SortableGalleryProvider';

type Cols = number;

type Positions = {
  [id: string]: number;
};

interface ImageItemProps {
  children: React.ReactNode;
  id: string;
  positions: SharedValue<Positions>;
  scrollView: AnimatedRef<Animated.ScrollView>;
  onDragEnd: (
    diffs: Positions,
    itemBeingEdited: string,
    newOrder: number,
  ) => void;
  editing: boolean;
  scrollY: SharedValue<number>;
  cols: Cols;
}

export function ImageItem({
  children,
  editing,
  positions,
  id,
  scrollY,
  scrollView,
  onDragEnd,
  cols,
}: ImageItemProps) {
  const insets = useSafeAreaInsets();
  const { getPosition, getOrder, size, animationConfig } = useSortableGallery();

  const containerHeight =
    Dimensions.get('window').height - insets.top - insets.bottom;
  const contentHeight = (Object.keys(positions.value).length / cols) * size;

  const isGestureActive = useSharedValue(false);
  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const ctxX = useSharedValue(0);
  const ctxY = useSharedValue(0);

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      if (!isGestureActive.value) {
        const pos = getPosition(newOrder);
        translateX.value = withTiming(pos.x, animationConfig);
        translateY.value = withTiming(pos.y, animationConfig);
      }
    },
  );

  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (editing) {
        ctxX.value = translateX.value;
        ctxY.value = translateY.value;
        isGestureActive.value = true;
      }
    })
    .onUpdate((event) => {
      if (editing) {
        translateX.value = ctxX.value + event.translationX;
        translateY.value = ctxY.value + event.translationY;

        const oldOrder = positions.value[id];
        const newOrder = getOrder(
          translateX.value,
          translateY.value,
          Object.keys(positions.value).length - 1,
        );

        if (oldOrder !== newOrder) {
          const newPositions = { ...positions.value };

          if (oldOrder > newOrder) {
            Object.keys(newPositions).forEach((key) => {
              if (newPositions[key] < newOrder || newPositions[key] >= oldOrder)
                return;
              newPositions[key] += 1;
            });
          }

          if (newOrder > oldOrder) {
            Object.keys(newPositions).forEach((key) => {
              if (newPositions[key] > newOrder || newPositions[key] <= oldOrder)
                return;
              newPositions[key] -= 1;
            });
          }

          newPositions[id] = newOrder;
          positions.value = newPositions;
        }

        const lowerBound = scrollY.value;
        const upperBound = lowerBound + containerHeight - size;
        const maxScroll = contentHeight - containerHeight;
        const leftToScrollDown = maxScroll - scrollY.value;

        if (translateY.value < lowerBound) {
          const diff = Math.min(lowerBound - translateY.value, lowerBound);
          scrollY.value -= diff;
          scrollTo(scrollView, 0, scrollY.value, false);
          ctxY.value -= diff;
          translateY.value = ctxY.value + event.translationY;
        }

        if (translateY.value > upperBound) {
          const diff = Math.min(
            translateY.value - upperBound,
            leftToScrollDown,
          );
          scrollY.value += diff;
          scrollTo(scrollView, 0, scrollY.value, false);
          ctxY.value += diff;
          translateY.value = ctxY.value + event.translationY;
        }
      }
    })
    .onEnd(() => {
      const destination = getPosition(positions.value[id]);

      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGestureActive.value = false;
        runOnJS(onDragEnd)(positions.value, id, positions.value[id]);
      });

      translateY.value = withTiming(destination.y, animationConfig);
    });

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = withSpring(isGestureActive.value ? 1.05 : 1);

    const safeTranslateX = isNaN(translateX.value) ? 0 : translateX.value;
    const safeTranslateY = isNaN(translateY.value) ? 0 : translateY.value;

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: size,
      height: size,
      zIndex,
      transform: [
        { translateX: safeTranslateX },
        { translateY: safeTranslateY },
        { scale },
      ],
    };
  });

  return (
    <Animated.View style={style}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
