import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PizzaScreen from '../screens/PizzaScreen';
import CoffeeScreen from '../screens/CoffeeScreen';
import MarketScreen from '../screens/MarketScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Pizza, Coffee, ShoppingCart, Settings } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { t, colors } = useApp();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.subText,
                tabBarStyle: {
                    backgroundColor: colors.tabBar,
                    borderTopColor: colors.border,
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 80,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                }
            }}
        >
            <Tab.Screen
                name="Pizza"
                component={PizzaScreen}
                options={{
                    tabBarLabel: t('pizza'),
                    tabBarIcon: ({ color, size }) => (
                        <Pizza color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Coffee"
                component={CoffeeScreen}
                options={{
                    tabBarLabel: t('coffee'),
                    tabBarIcon: ({ color, size }) => (
                        <Coffee color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Market"
                component={MarketScreen}
                options={{
                    tabBarLabel: t('market'),
                    tabBarIcon: ({ color, size }) => (
                        <ShoppingCart color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: t('settings'),
                    tabBarIcon: ({ color, size }) => (
                        <Settings color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
