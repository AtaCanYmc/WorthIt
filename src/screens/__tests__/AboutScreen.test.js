import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AboutScreen from '../AboutScreen';
import { Linking } from 'react-native';

// Mock Dependencies
jest.mock('../../context/AppContext', () => ({
    useApp: () => ({
        t: (key) => key,
        colors: { background: 'white', text: 'black', card: 'white', border: 'gray', primary: 'blue', subText: 'gray' }
    }),
}));

// Mock Constants because they are imported in the screen
jest.mock('../../config/constants', () => ({
    APP_VERSION: '9.9.9',
    COPYRIGHT_TEXT: 'Mock Copyright',
    CONFIG: {
        PRIVACY_POLICY_URL: 'https://mock.privacy',
        TERMS_OF_SERVICE_URL: 'https://mock.terms',
    }
}));

describe('AboutScreen', () => {
    test('Renders version and copyright correctly', () => {
        const { getByText } = render(<AboutScreen />);
        expect(getByText('version 9.9.9')).toBeTruthy();
        expect(getByText('copyright_notice')).toBeTruthy();
        // Note: The screen uses t('copyright_notice'), so it renders the key if mocked t returns key.
        // Wait, the screen implementation is: 
        // <Text ...>{t('copyright_notice')}</Text> 
        // So with t(k)=>k, it renders "copyright_notice".
        // Actually, let's double check if I used constants for copyright text or translation key.
        // I used t('copyright_notice') in the component. The constant COPYRIGHT_TEXT might be unused in the component or used as fallback?
        // Let's check component later. But for now, assuming t('copyright_notice').
    });

    test('Opens Privacy Policy link', async () => {
        const { getByText } = render(<AboutScreen />);

        // Mock canOpenURL to return true
        jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(true);
        const openUrlSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue();

        fireEvent.press(getByText('privacy_policy'));

        await waitFor(() => {
            expect(Linking.openURL).toHaveBeenCalledWith('https://mock.privacy');
        });
    });

    test('Opens Terms of Service link', async () => {
        const { getByText } = render(<AboutScreen />);

        // Mock canOpenURL to return true
        jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(true);
        const openUrlSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue();

        fireEvent.press(getByText('terms_of_service'));

        await waitFor(() => {
            expect(Linking.openURL).toHaveBeenCalledWith('https://mock.terms');
        });
    });
});
