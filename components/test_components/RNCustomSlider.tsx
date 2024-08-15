import React, { useCallback, useRef, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { debounce } from 'lodash';
import RangeSlider from 'crn-range-slider';
import Thumb from './Thumb';
import RailSelected from './RailSelected';
import Label from './Label';
import Rail from './Rail';
import Notch from './Notch';
import { View } from '../common/Themed';

interface RNCustomSliderProps {
  min: number;
  max: number;
  initialLow: number;
  initialHigh: number;
  formatToCurrency?: boolean;
  setLow: (low: number) => void;
  setHigh: (high: number) => void;
}

const RNCustomSlider: React.FC<RNCustomSliderProps> = ({
  min,
  max,
  initialLow,
  initialHigh,
  setLow,
  setHigh,
  formatToCurrency,
}) => {
  const isMounted = useRef(true);
  const [low, setLowState] = useState(initialLow);
  const [high, setHighState] = useState(initialHigh);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      setLowState(initialLow);
      setHighState(initialHigh);
    }
  }, [initialLow, initialHigh]);

  const renderThumb = useCallback(
    (name: 'low' | 'high') => <Thumb name={name} />,
    [],
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={value} currencyFormat={formatToCurrency} />,
    [formatToCurrency],
  );
  const renderNotch = useCallback(() => <Notch />, []);

  const debouncedHandleValueChange = debounce((low: number, high: number) => {
    if (isMounted.current) {
      setLow(low);
      setHigh(high);
    }
  }, 300);

  const handleValueChange = useCallback((low: number, high: number) => {
    setLowState(low);
    setHighState(high);
    debouncedHandleValueChange(low, high);
  }, []);

  return (
    <View style={styles.container}>
      <RangeSlider
        style={styles.slider}
        min={min}
        max={max}
        step={1}
        floatingLabel
        low={low}
        high={high}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    flex: 1,
  },
});

export default RNCustomSlider;
