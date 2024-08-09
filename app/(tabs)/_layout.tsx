import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import HomePageIcon from '@/components/icons/HomePageIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import MessengerIcon from '@/components/icons/MessengerIcon';
import UserIcon from '@/components/icons/UserIcon';
import MapIcon from '@/components/icons/MapIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarLabelStyle: { fontSize: 14, fontWeight: 500 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomePageIcon
              color={color}
              width={size}
              height={size}
              style={{ marginBottom: -3 }}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
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
