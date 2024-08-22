import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '@/constants/Colors';
import { View } from './common/Themed';

interface LottieSplashScreenProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LottieSplashScreen: React.FC<LottieSplashScreenProps> = ({
  setIsLoading,
}) => {
  return (
    <View
      style={[styles.container, { backgroundColor: Colors.light.emerald500 }]}
    >
      <LottieView
        source={require('@/assets/json/listd_splash_screen.json')}
        style={{ width: 200, height: 200 }}
        onAnimationFinish={setIsLoading}
        resizeMode="cover"
        loop={false}
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LottieSplashScreen;
