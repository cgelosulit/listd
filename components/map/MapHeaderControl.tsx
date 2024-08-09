import { StyleSheet } from 'react-native';
import { Text, View } from '../common/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';

interface MapHeaderControlProps {
  bottomSheetIndex: number;
  handleOpenListResults: () => void;
  handleCloseListResults: () => void;
}

const MapHeaderControl: React.FC<MapHeaderControlProps> = ({
  bottomSheetIndex,
  handleOpenListResults,
  handleCloseListResults,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={
          bottomSheetIndex === 4
            ? handleCloseListResults
            : handleOpenListResults
        }
        activeOpacity={0.7}
      >
        <Text>{bottomSheetIndex === 4 ? 'MAP VIEW' : 'LIST RESULTS'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 10,
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
  },
  buttonStyle: {},
});

export default MapHeaderControl;
