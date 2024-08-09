import React, { useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {
  Polyline,
  PanDragEvent,
  LatLng,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import MemoizedMarker from './MemoizedMarker';
import { config } from '@/constants/Configs';
import { Property } from '@/interface';
import { useColorScheme } from '@/hooks/useColorScheme';

type MapContainerProps = {
  debug?: boolean;
  isLoading?: boolean;
  isDrawing: boolean;
  properties: Property[];
  coordinates: LatLng[];
  defaultRegion: LatLng;
  boundingBoxCoords: LatLng[];
  boundingBoxCenter: LatLng | null;
  handleMapDrag: (event: PanDragEvent) => void;
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
};

const MemoizedPolyline = React.memo(
  ({ coordinates }: { coordinates: LatLng[] }) => (
    <Polyline coordinates={coordinates} strokeWidth={1} strokeColor="blue" />
  ),
);

const MapContainer: React.FC<MapContainerProps> = ({
  debug,
  isLoading,
  isDrawing,
  properties,
  coordinates,
  defaultRegion,
  boundingBoxCoords,
  boundingBoxCenter,
  handleMapDrag,
  handleTouchStart,
  handleTouchEnd,
}) => {
  const colorScheme = useColorScheme();
  const mapRef = useRef<MapView>(null);

  // TODO: Memoize the coordinates and properties to prevent unnecessary re-renders
  const memoizedCoordinates = useMemo(
    () =>
      coordinates.map((coord) => ({
        latitude: coord.latitude,
        longitude: coord.longitude,
      })),
    [coordinates],
  );

  // TODO: Memoize the properties to prevent unnecessary re-renders
  const memoizedProperties = useMemo(() => properties, [properties]);

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        showsUserLocation
        showsBuildings={false}
        loadingEnabled={isLoading}
        customMapStyle={colorScheme === 'dark' ? config.mapDarkMode : undefined}
        style={StyleSheet.absoluteFill}
        scrollEnabled={!isDrawing}
        onPanDrag={handleMapDrag}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        provider={PROVIDER_GOOGLE}
        // TODO - Set initial region based on user's location
        initialRegion={{
          ...defaultRegion,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {memoizedCoordinates.length > 0 && (
          <MemoizedPolyline coordinates={memoizedCoordinates} />
        )}
        {debug &&
          boundingBoxCoords.map((coord, index) => (
            <MemoizedMarker
              key={index}
              coordinate={coord}
              pinColor="violet"
              tracksViewChanges={false}
            />
          ))}
        {debug && boundingBoxCenter && (
          <MemoizedMarker
            coordinate={boundingBoxCenter}
            pinColor="orange"
            tracksViewChanges={false}
          />
        )}
        {memoizedProperties.map((property) => (
          <MemoizedMarker
            key={property.id}
            pinColor="red"
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            tracksViewChanges={false}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});

// TODO: Check if necessary to do this memoization
export default React.memo(MapContainer);
