import { Text } from '@/components/common/Themed';
import Colors from '@/constants/Colors';
import { useCustomTheme } from '@/context/CustomThemeProvider';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ListingsScreen() {
  const router = useRouter();
  const colorScheme = useCustomTheme();

  function CancelComponent(label: string = 'Cancel') {
    return router.canGoBack() ? (
      <TouchableOpacity activeOpacity={0.8} onPress={router.back}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: Colors.dark.text,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    ) : null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="present/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: Colors[colorScheme.theme].emerald500,
          },
          headerLeft: () => CancelComponent('Go back'),
        }}
      />
      <Stack.Screen
        name="filter"
        options={{
          headerTitle: '',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: Colors[colorScheme.theme].emerald500,
          },
          headerLeft: () => CancelComponent(),
        }}
      />
      <Stack.Screen
        name="sort"
        options={{
          headerTitle: '',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: Colors[colorScheme.theme].emerald500,
          },
          headerLeft: () => CancelComponent(),
        }}
      />
    </Stack>
  );
}
