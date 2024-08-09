import React from 'react';
import { MapMarker, Marker } from 'react-native-maps';
import { LatLng } from 'react-native-maps';

type MemoizedMarkerProps = {
  coordinate: LatLng;
  pinColor?: string;
  onPress?: () => void;
  [key: string]: any;
} & Partial<MapMarker>;

const MemoizedMarker: React.FC<MemoizedMarkerProps> = React.memo(
  ({ coordinate, pinColor, ...rest }) => {
    return <Marker coordinate={coordinate} pinColor={pinColor} {...rest} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.coordinate.latitude === nextProps.coordinate.latitude &&
      prevProps.coordinate.longitude === nextProps.coordinate.longitude
    );
  },
);

export default MemoizedMarker;
