import React, { createContext, useState, useContext } from 'react';
import { translations } from '../i18n/translations';

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

export const AppProvider = ({ children }) => {
    const [locale, setLocale] = useState('en'); // Defaults to 'en' as requested
    const [theme, setTheme] = useState('light');

    // Translation helper
    const t = (key, params = {}) => {
        let text = translations[locale][key] || key;

        // Simple interpolation: Replaces %{param}% with value
        Object.keys(params).forEach(param => {
            text = text.replace(`%{${param}}%`, params[param]);
        });

        return text;
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const switchLanguage = (lang) => {
        setLocale(lang);
    };

    const colors = themeColors[theme];

    return (
        <AppContext.Provider value={{
            locale,
            theme,
            colors,
            t,
            toggleTheme,
            switchLanguage
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
