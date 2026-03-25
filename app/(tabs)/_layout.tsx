import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#0f61a9ff',
            headerShown: false,
            tabBarStyle: {
                borderTopWidth: 0,
                elevation: 0,
                height: 60,
                paddingBottom: 10,
            }
        }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: '날씨',
                    tabBarIcon: ({ color, size }) => <Ionicons name="sunny" size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: '검색',
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
