import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import { useApp } from '../context/AppContext';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
    const { t, colors } = useApp();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.card,
                },
                headerTintColor: colors.primary,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: colors.text,
                },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name="SettingsMain"
                component={SettingsScreen}
                options={{ headerShown: false }} // Tab navigator has its own "Settings" label usually, or we show header here?
            // Actually existing screens have custom headers. Let's keep consistency.
            />
            <Stack.Screen
                name="About"
                component={AboutScreen}
                options={{
                    title: t('about_legal'),
                }}
            />
        </Stack.Navigator>
    );
}
