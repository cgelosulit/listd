import { StyleSheet, TouchableOpacity } from 'react-native';
import { LatLng, PanDragEvent } from 'react-native-maps';
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MapContainer from '@/screens/map-search/MapContainer';
import DrawingControls from '@/screens/map-search/DrawingControl';
import {
  calculateAverageDistanceFromCenterPointToAllBoundingBox,
  calculateAverageMaxAndMidpointDistance,
  calculateDistances,
  getBoundingBox,
  getBoundingBoxCenter,
  getPolylineCenter,
} from '@/utils/map-utils';
import { useInfiniteMapPropertySearch } from '@/hooks/useMapPropertySearch';
import MapNotificationHeaderLoader from '@/screens/map-search/MapNotificationHeaderLoader';
import { View } from '@/components/common/Themed';
import PropertyItem from '@/components/property/PropertyItem';
import { Link, Stack } from 'expo-router';
import ListIcon from '@/components/icons/ListIcon';
import Colors from '@/constants/Colors';
import { useCustomTheme } from '@/context/CustomThemeProvider';

interface BoundingBox {
  maxLat: number;
  maxLng: number;
  minLat: number;
  minLng: number;
}

type State = {
  stopRendering: boolean;
  propertyId: number;
  defaultRegion: LatLng;
  isDrawing: boolean;
  coordinates: LatLng[];
  isInTouch: boolean;
  bottomSheetIndex: number;
  pointsInside: LatLng[];
  distanceInKm: number;
  polylineCenter: LatLng | null;
  boundingBox: BoundingBox | null;
  boundingBoxCoords: LatLng[];
  boundingBoxCenter: LatLng | null;
};

type Action =
  | { type: 'TOGGLE_DRAWING' }
  | { type: 'SET_STOP_RENDERING'; payload: boolean }
  | { type: 'SET_PROPERTY_ID'; payload: number }
  | { type: 'SET_COORDINATES'; payload: LatLng[] }
  | { type: 'SET_IS_IN_TOUCH'; payload: boolean }
  | { type: 'SET_BOTTOM_SHEET_INDEX'; payload: number }
  | { type: 'SET_POINTS_INSIDE'; payload: LatLng[] }
  | { type: 'SET_DISTANCE_IN_KM'; payload: number }
  | { type: 'SET_POLYLINE_CENTER'; payload: LatLng | null }
  | { type: 'SET_BOUNDING_BOX'; payload: BoundingBox }
  | { type: 'SET_BOUNDING_BOX_COORDS'; payload: LatLng[] }
  | { type: 'SET_BOUNDING_BOX_CENTER'; payload: LatLng | null }
  | { type: 'RESET' };

const initialState: State = {
  stopRendering: false,
  propertyId: 0,
  defaultRegion: {
    latitude: 14.5597, // Latitude for Manila
    longitude: 121.021, // Longitude for Manila
  },
  isDrawing: false,
  bottomSheetIndex: -1,
  coordinates: [],
  isInTouch: false,
  pointsInside: [],
  distanceInKm: 0,
  polylineCenter: null,
  boundingBox: null,
  boundingBoxCoords: [],
  boundingBoxCenter: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_DRAWING':
      return {
        ...state,
        isDrawing: !state.isDrawing,
      };
    case 'SET_COORDINATES':
      return { ...state, coordinates: action.payload };
    case 'SET_STOP_RENDERING':
      return { ...state, stopRendering: action.payload };
    case 'SET_PROPERTY_ID':
      return { ...state, propertyId: action.payload };
    case 'SET_IS_IN_TOUCH':
      return { ...state, isInTouch: action.payload };
    case 'SET_BOTTOM_SHEET_INDEX':
      return { ...state, bottomSheetIndex: action.payload };
    case 'SET_POINTS_INSIDE':
      return { ...state, pointsInside: action.payload };
    case 'SET_DISTANCE_IN_KM':
      return { ...state, distanceInKm: action.payload };
    case 'SET_POLYLINE_CENTER':
      return { ...state, polylineCenter: action.payload };
    case 'SET_BOUNDING_BOX':
      return { ...state, boundingBox: action.payload };
    case 'SET_BOUNDING_BOX_COORDS':
      return { ...state, boundingBoxCoords: action.payload };
    case 'SET_BOUNDING_BOX_CENTER':
      return { ...state, boundingBoxCenter: action.payload };
    case 'RESET':
      return {
        ...state,
        coordinates: [],
        pointsInside: [],
        polylineCenter: null,
        boundingBox: null,
        boundingBoxCoords: [],
        boundingBoxCenter: null,
      };
    default:
      return state;
  }
};

export default function MapScreen() {
  const colorScheme = useCustomTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['3%', '45%'], []);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, data: response } = useInfiniteMapPropertySearch(
    {
      minLat: state.boundingBox?.minLat,
      minLong: state.boundingBox?.minLng,
      maxLat: state.boundingBox?.maxLat,
      maxLong: state.boundingBox?.maxLng,
      distanceInKilometers: state.distanceInKm,
      pointOfInterestLat: state.polylineCenter?.latitude,
      pointOfInterestLong: state.polylineCenter?.longitude,
    },
    state.boundingBox !== null &&
      state.distanceInKm > 0 &&
      state.polylineCenter !== null &&
      !state.isInTouch,
  );

  const property = useMemo(() => {
    return response?.pages
      ?.flatMap((p) => p.data.properties.results)
      .find((p) => p.id === state.propertyId);
  }, [response, state.propertyId]);

  const handleMapDrag = (event: PanDragEvent) => {
    event.persist();
    if (state.isDrawing && event.nativeEvent && event.nativeEvent.coordinate) {
      const { coordinate } = event.nativeEvent;
      dispatch({
        type: 'SET_COORDINATES',
        payload: [...state.coordinates, coordinate],
      });
    }
  };

  const optimizedHandleMapDrag = useCallback(handleMapDrag, [
    state.isDrawing,
    state.coordinates,
  ]);

  const handleButtonPress = () => {
    dispatch({ type: 'TOGGLE_DRAWING' });
  };

  const handleResetPress = () => {
    dispatch({ type: 'RESET' });
    dispatch({ type: 'SET_STOP_RENDERING', payload: false });
  };

  const handleTouchStart = () => {
    dispatch({ type: 'SET_IS_IN_TOUCH', payload: true });
  };

  const handleOnTouchEnd = () => {
    dispatch({ type: 'SET_IS_IN_TOUCH', payload: false });
    if (state.isDrawing) dispatch({ type: 'TOGGLE_DRAWING' });
  };

  const handleOnMarkerPress = (propertyId: number) => {
    dispatch({ type: 'SET_PROPERTY_ID', payload: propertyId });
    bottomSheetRef.current?.expand();
  };

  useEffect(() => {
    const { stopRendering, isInTouch, coordinates } = state;
    if (!stopRendering && !isInTouch && coordinates.length > 0) {
      const boundingBoxCoordinate = getBoundingBox(state.coordinates);
      dispatch({ type: 'SET_BOUNDING_BOX', payload: boundingBoxCoordinate });
      console.log('Bounding box:', boundingBoxCoordinate);

      const polylineCenterPoint = getPolylineCenter(state.coordinates);
      dispatch({
        type: 'SET_POLYLINE_CENTER',
        payload: polylineCenterPoint,
      });
      console.log('Points of interest:', polylineCenterPoint);

      if (polylineCenterPoint) {
        const averageDistanceFromCenterPointToAllBoundingBox =
          calculateAverageDistanceFromCenterPointToAllBoundingBox({
            centerX: polylineCenterPoint.latitude,
            centerY: polylineCenterPoint.longitude,
            minX: boundingBoxCoordinate.minLat,
            minY: boundingBoxCoordinate.minLng,
            maxX: boundingBoxCoordinate.maxLat,
            maxY: boundingBoxCoordinate.maxLng,
          });

        const distancesFromPolylineToPolyCenter = calculateDistances(
          polylineCenterPoint,
          state.coordinates,
        );

        const distances = calculateAverageMaxAndMidpointDistance(
          distancesFromPolylineToPolyCenter,
        );

        dispatch({
          type: 'SET_DISTANCE_IN_KM',
          payload: distances.midpoint,
        });

        console.log('Distances:', distances);

        console.log(
          'Average distance from center to bounding box edges:',
          averageDistanceFromCenterPointToAllBoundingBox,
        );
      }

      dispatch({
        type: 'SET_BOUNDING_BOX_COORDS',
        payload: [
          {
            latitude: boundingBoxCoordinate.minLat,
            longitude: boundingBoxCoordinate.minLng,
          },
          {
            latitude: boundingBoxCoordinate.minLat,
            longitude: boundingBoxCoordinate.maxLng,
          },
          {
            latitude: boundingBoxCoordinate.maxLat,
            longitude: boundingBoxCoordinate.minLng,
          },
          {
            latitude: boundingBoxCoordinate.maxLat,
            longitude: boundingBoxCoordinate.maxLng,
          },
        ],
      });

      const bboxCenter = getBoundingBoxCenter(boundingBoxCoordinate);
      dispatch({ type: 'SET_BOUNDING_BOX_CENTER', payload: bboxCenter });
      dispatch({ type: 'SET_STOP_RENDERING', payload: true });
    }
  }, [state.isInTouch, state.coordinates, state.stopRendering]);

  return (
    <View style={styles.container}>
      {response?.pages &&
        response?.pages.flatMap((x) => x.data.properties.results).length >
          0 && (
          <Stack.Screen
            options={{
              headerLeft: () => (
                <Link style={{ marginLeft: 10 }} href="/listings" asChild>
                  <TouchableOpacity>
                    <ListIcon
                      width={24}
                      height={24}
                      color={Colors[colorScheme.theme].tabIconSelected}
                    />
                  </TouchableOpacity>
                </Link>
              ),
            }}
          />
        )}
      {isLoading && <MapNotificationHeaderLoader text="Loading..." />}
      {![1, 2].includes(state.bottomSheetIndex) && (
        <DrawingControls
          isDrawing={state.isDrawing}
          coordinates={state.coordinates}
          boundingBoxCoords={state.boundingBoxCoords}
          boundingBoxCenter={state.boundingBoxCenter}
          handleButtonPress={handleButtonPress}
          handleResetPress={handleResetPress}
        />
      )}
      <MapContainer
        isDrawing={state.isDrawing}
        properties={
          (response?.pages &&
            response?.pages.flatMap((x) => x.data.properties.results)) ||
          []
        }
        coordinates={state.coordinates}
        defaultRegion={state.defaultRegion}
        boundingBoxCoords={state.boundingBoxCoords}
        boundingBoxCenter={state.boundingBoxCenter}
        handleOnMarkerPress={handleOnMarkerPress}
        handleMapDrag={optimizedHandleMapDrag}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleOnTouchEnd}
      />
      {state.propertyId > 0 && property && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          index={state.bottomSheetIndex}
          onChange={(index) =>
            dispatch({ type: 'SET_BOTTOM_SHEET_INDEX', payload: index })
          }
          backgroundStyle={{
            backgroundColor: Colors[colorScheme.theme].background,
          }}
          handleIndicatorStyle={{
            backgroundColor: Colors[colorScheme.theme].tabIconDefault,
          }}
        >
          <BottomSheetView style={{ alignItems: 'center' }}>
            <View style={{ position: 'absolute', left: 15, right: 15 }}>
              <PropertyItem property={property} />
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
