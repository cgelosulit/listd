import React from 'react';
import { MapMarker, Marker } from 'react-native-maps';
import { LatLng } from 'react-native-maps';

type MemoizedMarkerProps = {
  identifier?: string;
  coordinate: LatLng;
  pinColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
  [key: string]: any;
} & Partial<MapMarker>;

const MemoizedMarker: React.FC<MemoizedMarkerProps> = React.memo(
  ({ identifier, coordinate, pinColor, children, ...rest }) => {
    return (
      <Marker
        identifier={identifier}
        tracksInfoWindowChanges={false}
        tracksViewChanges={false}
        coordinate={coordinate}
        pinColor={pinColor}
        {...rest}
      >
        {children}
      </Marker>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.coordinate.latitude === nextProps.coordinate.latitude &&
      prevProps.coordinate.longitude === nextProps.coordinate.longitude
    );
  },
);

export default MemoizedMarker;
