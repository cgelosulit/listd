import React, { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, {
  Polyline,
  PanDragEvent,
  LatLng,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import MemoizedMarker from './MemoizedMarker';
import { Configs } from '@/constants/Configs';
import { Property } from '@/interface';
import { Text, View } from '@/components/common/Themed';
import Colors from '@/constants/Colors';
import { useCustomTheme } from '@/context/CustomThemeProvider';
import { formatToCurrency } from '@/utils/format-to-currency';

type MapContainerProps = {
  debug?: boolean;
  isLoading?: boolean;
  isDrawing: boolean;
  properties: Property[];
  coordinates: LatLng[];
  defaultRegion: LatLng;
  boundingBoxCoords: LatLng[];
  boundingBoxCenter: LatLng | null;
  handleOnMarkerPress?: (propertyId: number) => void;
  handleMapDrag: (event: PanDragEvent) => void;
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
};

const MemoizedPolyline = React.memo(
  ({ coordinates }: { coordinates: LatLng[] }) => {
    const colorScheme = useCustomTheme();
    return (
      <Polyline
        strokeWidth={2.5}
        coordinates={coordinates}
        strokeColor={Colors[colorScheme.theme].emerald500}
      />
    );
  },
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
  handleOnMarkerPress,
  handleMapDrag,
  handleTouchStart,
  handleTouchEnd,
}) => {
  const colorScheme = useCustomTheme();
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
        rotateEnabled={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
        loadingEnabled={isLoading}
        style={StyleSheet.absoluteFill}
        scrollEnabled={!isDrawing}
        onPanDrag={handleMapDrag}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        provider={PROVIDER_GOOGLE}
        onMarkerPress={(event) =>
          handleOnMarkerPress &&
          handleOnMarkerPress(Number(event.nativeEvent.id))
        }
        customMapStyle={
          colorScheme.theme === 'dark' ? Configs.mapDarkMode : undefined
        }
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
              identifier={`bounding-box-${index}`}
              key={index}
              coordinate={coord}
              pinColor="violet"
              tracksViewChanges={false}
            />
          ))}
        {debug && boundingBoxCenter && (
          <MemoizedMarker
            identifier="bounding-box-center-point"
            coordinate={boundingBoxCenter}
            tracksViewChanges={false}
            pinColor="orange"
          />
        )}
        {memoizedProperties.map((property) => (
          <MemoizedMarker
            identifier={String(property.id)}
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
          >
            <View
              style={[
                styles.markerButton,
                {
                  backgroundColor: Colors[colorScheme.theme].emerald500,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: Colors.dark.text,
                }}
              >
                {formatToCurrency(Number(property.price), { toFixed: 0 })}
              </Text>
            </View>
          </MemoizedMarker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  markerButton: {
    padding: 5,
    borderRadius: 8,
  },
});

// TODO: Check if necessary to do this memoization
export default React.memo(MapContainer);
