import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HistoryScreen from '../HistoryScreen';
import { AppProvider } from '../../context/AppContext'; // Import provider to wrap, or mock hook

// Mocking useApp hook directly is often cleaner for component tests
// avoiding the complexity of the real Context state logic if possible
// But implementing provider wrap is also fine. Let's try mocking the module context first.
jest.mock('../../context/AppContext', () => ({
    useApp: jest.fn(),
    AppProvider: ({ children }) => children, // dummy provider if needed
}));

import { useApp } from '../../context/AppContext';

describe('HistoryScreen', () => {
    const mockRemove = jest.fn();
    const mockClear = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Renders empty state correctly', () => {
        useApp.mockReturnValue({
            t: (key) => key,
            colors: { background: 'white', text: 'black', card: 'white', border: 'gray', primary: 'blue', subText: 'gray' },
            history: [],
            removeFromHistory: mockRemove,
            clearAllHistory: mockClear
        });

        const { getByText } = render(<HistoryScreen />);
        expect(getByText('no_history')).toBeTruthy();
    });

    test('Renders history items correctly', () => {
        const mockHistory = [
            { id: '1', module: 'pizza', timestamp: 1620000000000, resultSummary: 'Pizza Deal' },
            { id: '2', module: 'coffee', timestamp: 1620000000000, resultSummary: 'Coffee Deal' }
        ];

        useApp.mockReturnValue({
            t: (key) => key,
            colors: { background: 'white', text: 'black', card: 'white', border: 'gray', primary: 'blue', subText: 'gray' },
            history: mockHistory,
            removeFromHistory: mockRemove,
            clearAllHistory: mockClear
        });

        const { getByText, getAllByText } = render(<HistoryScreen />);
        expect(getByText('Pizza Deal')).toBeTruthy();
        expect(getByText('Coffee Deal')).toBeTruthy();
        // Check for delete buttons
        expect(getAllByText('delete')).toHaveLength(2);
    });

    test('Calls removeFromHistory when delete is pressed', () => {
        const mockHistory = [
            { id: '1', module: 'pizza', timestamp: 1620000000000, resultSummary: 'Pizza Deal' }
        ];

        useApp.mockReturnValue({
            t: (key) => key,
            colors: { background: 'white', text: 'black', card: 'white', border: 'gray', primary: 'blue', subText: 'gray' },
            history: mockHistory,
            removeFromHistory: mockRemove,
            clearAllHistory: mockClear
        });

        const { getByText } = render(<HistoryScreen />);
        fireEvent.press(getByText('delete'));
        expect(mockRemove).toHaveBeenCalledWith('1');
    });
});
