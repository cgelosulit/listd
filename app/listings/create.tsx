import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/common/Themed';
import { MonoText } from '@/components/common/StyledText';

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>Listings create screen</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <MonoText style={{ textAlign: 'center' }}>
          [Core:UI:Error]: PanGesture Initial value for X and Y is null
        </MonoText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
