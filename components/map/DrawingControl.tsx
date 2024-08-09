import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LatLng } from 'react-native-maps';
import { Text, View } from '../common/Themed';
import PointingHandIcon from '../icons/PointingHandIcon';
import XIcon from '../icons/XIcon';
import { SvgProps } from 'react-native-svg';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type DrawingControlsProps = {
  isDrawing: boolean;
  coordinates: LatLng[];
  boundingBoxCoords: LatLng[];
  boundingBoxCenter: LatLng | null;
  handleButtonPress: () => void;
  handleResetPress: () => void;
};

const DrawingControls: React.FC<DrawingControlsProps> = ({
  isDrawing,
  coordinates,
  boundingBoxCoords,
  boundingBoxCenter,
  handleButtonPress,
  handleResetPress,
}) => {
  const colorScheme = useColorScheme();
  const renderButton = (
    onPress: () => void,
    IconComponent: React.FC<SvgProps>,
    text?: string,
  ) => (
    <TouchableOpacity
      style={[
        styles.drawingButton,
        {
          backgroundColor: Colors[colorScheme].background,
          shadowColor:
            colorScheme === 'dark'
              ? Colors.light.background
              : Colors.dark.background,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconComponent
        width={28}
        height={28}
        color={Colors[colorScheme].text}
        {...IconComponent}
      />
      {text && (
        <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {boundingBoxCoords.length === 0 &&
        boundingBoxCenter === null &&
        renderButton(
          handleButtonPress,
          PointingHandIcon,
          isDrawing ? 'Stop' : 'Draw',
        )}
      {coordinates.length > 0 &&
        boundingBoxCenter &&
        renderButton(handleResetPress, XIcon)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
  },
  drawingButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 110,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 2,
    width: 55,
    height: 55,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: '700',
  },
});

export default DrawingControls;
