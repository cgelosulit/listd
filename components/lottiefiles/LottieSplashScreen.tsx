import { StyleSheet } from 'react-native';
import { View } from '../common/Themed';
import LottieView from 'lottie-react-native';
import React, { Dispatch, SetStateAction } from 'react';
import Colors from '@/constants/Colors';

interface LottieSplashScreenProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const LottieSplashScreen: React.FC<LottieSplashScreenProps> = ({
  setIsLoading,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: Colors.light.tint }]}>
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
