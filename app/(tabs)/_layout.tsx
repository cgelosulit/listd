import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import HeartIcon from '@/components/icons/HeartIcon';
import MessengerIcon from '@/components/icons/MessengerIcon';
import UserIcon from '@/components/icons/UserIcon';
import MapIcon from '@/components/icons/MapIcon';
import ListIcon from '@/components/icons/ListIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarLabelStyle: { fontSize: 14, fontWeight: 500 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Listings',
          tabBarIcon: ({ color, size }) => (
            <ListIcon
              color={color}
              width={size}
              height={size}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <MapIcon
              color={color}
              width={size}
              height={size}
              strokeWidth={35}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          href: null,
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <HeartIcon
              color={color}
              width={size}
              height={size}
              strokeWidth={35}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          href: null,
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MessengerIcon
              color={color}
              width={size}
              height={size}
              strokeWidth={35}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <UserIcon
              color={color}
              width={size}
              height={size}
              strokeWidth={35}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
