import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { useCustomTheme } from '@/context/CustomThemeProvider';
import HomePageIcon from '@/components/icons/HomePageIcon';
import HeartIcon from '@/components/icons/HeartIcon';
import MessengerIcon from '@/components/icons/MessengerIcon';
import UserIcon from '@/components/icons/UserIcon';
import MapIcon from '@/components/icons/MapIcon';
import ListIcon from '@/components/icons/ListIcon';

export default function TabLayout() {
  const colorScheme = useCustomTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme.theme].emerald500,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 500,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme.theme].emerald500,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Listd',
          headerStyle: {
            backgroundColor: Colors[colorScheme.theme].background,
          },
          headerTitleStyle: {
            fontSize: 32,
          },
          tabBarIcon: ({ color, size }) => (
            <HomePageIcon
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
      <Tabs.Screen
        name="for-delete-listings"
        options={{
          href: null,
          title: 'Listings',
          tabBarIcon: ({ color, size }) => (
            <ListIcon
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
