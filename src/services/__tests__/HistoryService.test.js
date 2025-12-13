import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryService } from '../HistoryService';

describe('HistoryService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        AsyncStorage.getItem.mockClear();
        AsyncStorage.setItem.mockClear();
        AsyncStorage.removeItem.mockClear();
    });

    test('getHistory returns empty array on null', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce(null);
        const history = await HistoryService.getHistory();
        expect(history).toEqual([]);
    });

    test('getHistory returns parsed array', async () => {
        const mockData = [{ id: '1', module: 'pizza' }];
        AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockData));
        const history = await HistoryService.getHistory();
        expect(history).toEqual(mockData);
    });

    test('saveRecord adds new record to empty history', async () => {
        AsyncStorage.getItem.mockResolvedValueOnce(null);
        const record = { module: 'pizza', resultSummary: 'Test' };

        await HistoryService.saveRecord(record);

        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            'app_history',
            expect.stringContaining('"module":"pizza"')
        );
    });

    test('saveRecord respects limit of 50 (FIFO)', async () => {
        // Create array of 50 items
        const existingHistory = Array.from({ length: 50 }, (_, i) => ({ id: i.toString() }));
        AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(existingHistory));

        const newRecord = { module: 'pizza' };
        await HistoryService.saveRecord(newRecord);

        // Verify setItem was called with 50 items (new + 49 old)
        const expectedJson = AsyncStorage.setItem.mock.calls[0][1];
        const parsed = JSON.parse(expectedJson);

        expect(parsed.length).toBe(50);
        expect(parsed[0].module).toBe('pizza'); // Newest first
        expect(parsed[49].id).toBe('48'); // Oldest (49) should be gone, 48 remains
    });

    test('clearHistory removes item', async () => {
        await HistoryService.clearHistory();
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('app_history');
    });

    test('deleteRecord removes specific item', async () => {
        const mockHistory = [
            { id: '1', val: 'a' },
            { id: '2', val: 'b' }
        ];
        AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockHistory));

        await HistoryService.deleteRecord('1');

        const expectedJson = AsyncStorage.setItem.mock.calls[0][1];
        const parsed = JSON.parse(expectedJson);

        expect(parsed.length).toBe(1);
        expect(parsed[0].id).toBe('2');
    });
});
