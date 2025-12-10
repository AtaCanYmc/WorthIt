import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PizzaScreen from '../screens/PizzaScreen';
import CoffeeScreen from '../screens/CoffeeScreen';
import MarketScreen from '../screens/MarketScreen';
import { Pizza, Coffee, ShoppingCart } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#FF5722',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
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
                    tabBarLabel: 'Pizza',
                    tabBarIcon: ({ color, size }) => (
                        <Pizza color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Kahve"
                component={CoffeeScreen}
                options={{
                    tabBarLabel: 'Kahve',
                    tabBarIcon: ({ color, size }) => (
                        <Coffee color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Market"
                component={MarketScreen}
                options={{
                    tabBarLabel: 'Market',
                    tabBarIcon: ({ color, size }) => (
                        <ShoppingCart color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
