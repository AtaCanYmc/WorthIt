import React, { useContext, useEffect } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider, useApp } from '../AppContext';
import { Text, Button } from 'react-native';

// Helper component to consume context
const TestComponent = () => {
    const { locale, switchLanguage, unitSystem, switchUnitSystem } = useApp();
    return (
        <>
            <Text testID="locale">{locale}</Text>
            <Text testID="unit">{unitSystem}</Text>
            <Button title="Change Lang" onPress={() => switchLanguage('tr')} />
            <Button title="Change Unit" onPress={() => switchUnitSystem('imperial')} />
        </>
    );
};

describe('AppContext Persistence', () => {
    beforeEach(() => {
        AsyncStorage.getItem.mockClear();
        AsyncStorage.setItem.mockClear();
    });

    test('Loads settings from AsyncStorage on mount', async () => {
        AsyncStorage.getItem.mockImplementation((key) => {
            if (key === 'app_locale') return Promise.resolve('fr');
            if (key === 'app_unit_system') return Promise.resolve('imperial');
            return Promise.resolve(null);
        });

        const { getByTestId } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        await waitFor(() => {
            expect(getByTestId('locale').props.children).toBe('fr');
            expect(getByTestId('unit').props.children).toBe('imperial');
        });

        expect(AsyncStorage.getItem).toHaveBeenCalledWith('app_locale');
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('app_unit_system');
    });

    test('Saves settings to AsyncStorage when changed', async () => {
        const { getByText } = render(
            <AppProvider>
                <TestComponent />
            </AppProvider>
        );

        fireEvent.press(getByText('Change Lang'));
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('app_locale', 'tr');

        fireEvent.press(getByText('Change Unit'));
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('app_unit_system', 'imperial');
    });
});
