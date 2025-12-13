import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'app_history';
const MAX_HISTORY_ITEMS = 50;

export const HistoryService = {
    getHistory: async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error("Failed to load history", e);
            return [];
        }
    },

    saveRecord: async (record) => {
        try {
            const currentHistory = await HistoryService.getHistory();
            const newRecord = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                timestamp: Date.now(),
                ...record
            };

            const updatedHistory = [newRecord, ...currentHistory].slice(0, MAX_HISTORY_ITEMS);
            await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
            return updatedHistory;
        } catch (e) {
            console.error("Failed to save record", e);
            return [];
        }
    },

    clearHistory: async () => {
        try {
            await AsyncStorage.removeItem(HISTORY_KEY);
            return [];
        } catch (e) {
            console.error("Failed to clear history", e);
            return [];
        }
    },

    deleteRecord: async (id) => {
        try {
            const currentHistory = await HistoryService.getHistory();
            const updatedHistory = currentHistory.filter(item => item.id !== id);
            await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
            return updatedHistory;
        } catch (e) {
            console.error("Failed to delete record", e);
            return [];
        }
    }
};
