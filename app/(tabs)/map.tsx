import { StyleSheet } from 'react-native';
import { LatLng, PanDragEvent } from 'react-native-maps';
import { Text, View } from '@/components/common/Themed';
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import MapContainer from '@/components/map/MapContainer';
import DrawingControls from '@/components/map/DrawingControl';
import {
  calculateAverageDistanceFromCenterPointToAllBoundingBox,
  calculateAverageMaxAndMidpointDistance,
  calculateDistances,
  getBoundingBox,
  getBoundingBoxCenter,
  getPolylineCenter,
} from '@/utils/mapUtils';
import { useMapPropertySearch } from '@/hooks/useMapPropertySearch';
import MapNotificationHeaderLoader from '@/components/map/MapNotificationHeaderLoader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import MapHeaderControl from '@/components/map/MapHeaderControl';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import PropertyCard from '@/components/property/PropertyCard';

interface BoundingBox {
  maxLat: number;
  maxLng: number;
  minLat: number;
  minLng: number;
}

type State = {
  defaultRegion: LatLng;
  isDrawing: boolean;
  coordinates: LatLng[];
  isInTouch: boolean;
  bottomSheetIndex: number;
  pointsInside: LatLng[];
  distanceInMiles: number;
  polylineCenter: LatLng | null;
  boundingBox: BoundingBox | null;
  boundingBoxCoords: LatLng[];
  boundingBoxCenter: LatLng | null;
};

type Action =
  | { type: 'TOGGLE_DRAWING' }
  | { type: 'SET_COORDINATES'; payload: LatLng[] }
  | { type: 'SET_IS_IN_TOUCH'; payload: boolean }
  | { type: 'SET_BOTTOM_SHEET_INDEX'; payload: number }
  | { type: 'SET_POINTS_INSIDE'; payload: LatLng[] }
  | { type: 'SET_DISTANCE_IN_MILES'; payload: number }
  | { type: 'SET_POLYLINE_CENTER'; payload: LatLng | null }
  | { type: 'SET_BOUNDING_BOX'; payload: BoundingBox }
  | { type: 'SET_BOUNDING_BOX_COORDS'; payload: LatLng[] }
  | { type: 'SET_BOUNDING_BOX_CENTER'; payload: LatLng | null }
  | { type: 'RESET' };

const initialState: State = {
  defaultRegion: {
    latitude: 14.625189853932493, // Latitude for Manila
    longitude: 121.07380713841745, // Longitude for Manila
  },
  isDrawing: false,
  bottomSheetIndex: -1,
  coordinates: [],
  isInTouch: false,
  pointsInside: [],
  distanceInMiles: 0,
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
    case 'SET_IS_IN_TOUCH':
      return { ...state, isInTouch: action.payload };
    case 'SET_BOTTOM_SHEET_INDEX':
      return { ...state, bottomSheetIndex: action.payload };
    case 'SET_POINTS_INSIDE':
      return { ...state, pointsInside: action.payload };
    case 'SET_DISTANCE_IN_MILES':
      return { ...state, distanceInMiles: action.payload };
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
  const colorScheme = useColorScheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['5%', '50%', '70%', '80%', '90%'], []);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, data: response } = useMapPropertySearch(
    {
      minLat: state.boundingBox?.minLat,
      minLong: state.boundingBox?.minLng,
      maxLat: state.boundingBox?.maxLat,
      maxLong: state.boundingBox?.maxLng,
      distanceInMiles: state.distanceInMiles,
      pointOfInterestLat: state.polylineCenter?.latitude,
      pointOfInterestLong: state.polylineCenter?.longitude,
    },
    state.boundingBox !== null &&
      state.distanceInMiles > 0 &&
      state.polylineCenter !== null &&
      !state.isInTouch,
  );

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
  };

  const handleTouchStart = () => {
    dispatch({ type: 'SET_IS_IN_TOUCH', payload: true });
  };

  const handleOnTouchEnd = () => {
    dispatch({ type: 'SET_IS_IN_TOUCH', payload: false });
    if (state.isDrawing) dispatch({ type: 'TOGGLE_DRAWING' });
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={0}
        {...props}
      />
    ),
    [],
  );

  useEffect(() => {
    if (!state.isInTouch && state.coordinates.length > 0) {
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

        console.log(distances);

        dispatch({
          type: 'SET_DISTANCE_IN_MILES',
          payload: distances.average,
        });

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
    }
  }, [state.isInTouch, state.coordinates]);

  useEffect(() => {
    if (
      !isLoading &&
      state.bottomSheetIndex === -1 &&
      response?.data?.properties.results.length
    ) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [isLoading, response?.data, state.bottomSheetIndex]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <MapHeaderControl
        bottomSheetIndex={state.bottomSheetIndex}
        handleOpenListResults={() => bottomSheetRef.current?.expand()}
        handleCloseListResults={() => bottomSheetRef.current?.close()}
      />
      {isLoading && <MapNotificationHeaderLoader text="Loading..." />}
      <DrawingControls
        isDrawing={state.isDrawing}
        coordinates={state.coordinates}
        boundingBoxCoords={state.boundingBoxCoords}
        boundingBoxCenter={state.boundingBoxCenter}
        handleButtonPress={handleButtonPress}
        handleResetPress={handleResetPress}
      />
      <MapContainer
        isDrawing={state.isDrawing}
        properties={response?.data?.properties.results || []}
        coordinates={state.coordinates}
        defaultRegion={state.defaultRegion}
        boundingBoxCoords={state.boundingBoxCoords}
        boundingBoxCenter={state.boundingBoxCenter}
        handleMapDrag={optimizedHandleMapDrag}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleOnTouchEnd}
      />
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        index={state.bottomSheetIndex}
        onAnimate={(_, to) =>
          dispatch({ type: 'SET_BOTTOM_SHEET_INDEX', payload: to })
        }
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: Colors[colorScheme].background,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors[colorScheme].tabIconDefault,
        }}
      >
        <BottomSheetFlatList
          data={response?.data?.properties.results || []}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
