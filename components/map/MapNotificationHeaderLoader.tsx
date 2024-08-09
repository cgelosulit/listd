import { StyleSheet } from 'react-native';
import { Text, View } from '../common/Themed';
import React from 'react';

interface MapNotificationHeaderLoaderProps {
  text: string;
}

const MapNotificationHeaderLoader: React.FC<
  MapNotificationHeaderLoaderProps
> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{text}</Text>
      </View>
    </View>
  );
};

export default MapNotificationHeaderLoader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    top: 50,
    left: 0,
    right: 0,
  },
  loadingContainer: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 12,
  },
});
