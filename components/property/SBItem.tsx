import Animated, { AnimatedProps } from 'react-native-reanimated';
import { SBImageItem } from './SBImageItem';
import { SBTextItem } from './SBTextItem';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { useState } from 'react';
import { ViewProps } from '../common/Themed';
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

interface Props extends AnimatedProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index?: number;
  pretty?: boolean;
  showIndex?: boolean;
  img?: ImageSourcePropType;
}

export const SBItem: React.FC<Props> = (props) => {
  const {
    style,
    showIndex = true,
    index,
    pretty,
    img,
    testID,
    ...animatedViewProps
  } = props;
  const enablePretty = false;
  const [isPretty, setIsPretty] = useState(pretty || enablePretty);
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}
    >
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
        {isPretty || img ? (
          <SBImageItem
            style={style}
            index={index}
            showIndex={typeof index === 'number' && showIndex}
            img={img}
          />
        ) : (
          <SBTextItem style={style} index={index} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};
