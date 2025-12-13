import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../i18n/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryService } from '../services/HistoryService';

const AppContext = createContext();

export const themeColors = {
    light: {
        background: '#f5f5f5',
        card: '#ffffff',
        text: '#333333',
        subText: '#666666',
        primary: '#FF5722', // Pizza orange
        border: '#eeeeee',
        inputBg: '#f9f9f9',
        success: '#4CAF50',
        successBg: '#E8F5E9',
        error: '#d32f2f',
        coffeeTitle: '#795548',
        marketTitle: '#2196F3',
        tabBar: '#ffffff',
    },
    dark: {
        background: '#121212',
        card: '#1e1e1e',
        text: '#ffffff',
        subText: '#aaaaaa',
        primary: '#FF8A65', // Lighter orange for dark mode
        border: '#333333',
        inputBg: '#2c2c2c',
        success: '#81C784',
        successBg: '#1b3320',
        error: '#ef5350',
        coffeeTitle: '#A1887F',
        marketTitle: '#64B5F6',
        tabBar: '#1e1e1e',
    }
};

export const APP_CURRENCIES = [
    { code: 'EUR', symbol: '€', label: 'Euro (€)' },
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'TRY', symbol: '₺', label: 'TL (₺)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
];

export const AppProvider = ({ children }) => {
    const [locale, setLocale] = useState('en');
    const [theme, setTheme] = useState('light');
    const [currency, setCurrency] = useState('EUR');
    const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' or 'imperial'
    const [history, setHistory] = useState([]);

    // Load persistence
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedLocale = await AsyncStorage.getItem('app_locale');
                const storedTheme = await AsyncStorage.getItem('app_theme');
                const storedCurrency = await AsyncStorage.getItem('app_currency');
                const storedUnitSystem = await AsyncStorage.getItem('app_unit_system');
                const storedHistory = await HistoryService.getHistory();

                if (storedLocale) setLocale(storedLocale);
                if (storedTheme) setTheme(storedTheme);
                if (storedCurrency) setCurrency(storedCurrency);
                if (storedUnitSystem) setUnitSystem(storedUnitSystem);
                setHistory(storedHistory);
            } catch (e) {
                console.error("Failed to load settings", e);
            }
        };
        loadSettings();
    }, []);

    const addToHistory = async (record) => {
        const updatedHistory = await HistoryService.saveRecord(record);
        setHistory(updatedHistory);
    };

    const removeFromHistory = async (id) => {
        const updatedHistory = await HistoryService.deleteRecord(id);
        setHistory(updatedHistory);
    };

    const clearAllHistory = async () => {
        await HistoryService.clearHistory();
        setHistory([]);
    };

    // Save Persistence helpers
    const saveSetting = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error("Failed to save setting", key, e);
        }
    };

    const t = (key, params = {}) => {
        let text = translations[locale][key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`%{${param}}%`, params[param]);
        });
        return text;
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        saveSetting('app_theme', newTheme);
    };

    const switchLanguage = (lang) => {
        setLocale(lang);
        saveSetting('app_locale', lang);
    };

    const switchCurrency = (curr) => {
        setCurrency(curr);
        saveSetting('app_currency', curr);
    };

    const switchUnitSystem = (system) => {
        setUnitSystem(system);
        saveSetting('app_unit_system', system);
    };

    const formatPrice = (amount) => {
        if (typeof amount !== 'number') return amount;

        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
            }).format(amount);
        } catch (error) {
            const symbol = APP_CURRENCIES.find(c => c.code === currency)?.symbol || currency;
            return `${symbol} ${amount.toFixed(2)}`;
        }
    };

    // Helper to get labels based on unit system
    const getUnitLabel = (type) => {
        // type: 'length', 'volume', 'weight'
        if (unitSystem === 'metric') {
            if (type === 'length') return 'cm';
            if (type === 'area') return 'cm²';
            if (type === 'volume') return 'ml';
            if (type === 'weight') return 'g';
        } else {
            if (type === 'length') return 'in'; // or inch
            if (type === 'area') return 'in²';
            if (type === 'volume') return 'fl oz';
            if (type === 'weight') return 'oz';
        }
        return '';
    };

    const colors = themeColors[theme];

    return (
        <AppContext.Provider value={{
            locale,
            theme,
            currency,
            unitSystem, // Export state
            colors,
            t,
            formatPrice,
            toggleTheme,
            switchLanguage,
            switchCurrency,
            switchUnitSystem, // Export switcher
            getUnitLabel, // Export helper
            history,
            addToHistory,
            removeFromHistory,
            clearAllHistory
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
