import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp, APP_CURRENCIES } from '../context/AppContext';
import { Globe, Moon, Sun, DollarSign, Ruler } from 'lucide-react-native';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
];

const UNIT_SYSTEMS = [
    { code: 'metric', labelKey: 'metric' },
    { code: 'imperial', labelKey: 'imperial' },
];

export default function SettingsScreen() {
    const { theme, toggleTheme, locale, switchLanguage, currency, switchCurrency, unitSystem, switchUnitSystem, t, colors } = useApp();
    const isDark = theme === 'dark';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
            <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.card }]}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{t('settings')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Theme Section */}
                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.row}>
                        <View style={styles.iconLabel}>
                            {isDark ? <Moon color={colors.text} size={24} /> : <Sun color={colors.text} size={24} />}
                            <Text style={[styles.label, { color: colors.text }]}>{t('dark_mode')}</Text>
                        </View>
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: "#767577", true: colors.primary }}
                            thumbColor={isDark ? "#f4f3f4" : "#f4f3f4"}
                        />
                    </View>
                </View>

                {/* Units Section */}
                <Text style={[styles.sectionHeader, { color: colors.subText }]}>{t('unit_system')}</Text>
                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, padding: 0 }]}>
                    {UNIT_SYSTEMS.map((system, index) => (
                        <TouchableOpacity
                            key={system.code}
                            style={[
                                styles.langItem,
                                { borderBottomColor: colors.border },
                                index === UNIT_SYSTEMS.length - 1 && { borderBottomWidth: 0 }
                            ]}
                            onPress={() => switchUnitSystem(system.code)}
                        >
                            <View style={styles.iconLabel}>
                                <Ruler color={system.code === unitSystem ? colors.primary : colors.subText} size={20} />
                                <Text style={[
                                    styles.langText,
                                    { color: system.code === unitSystem ? colors.primary : colors.text },
                                    system.code === unitSystem && { fontWeight: 'bold' }
                                ]}>
                                    {t(system.labelKey)}
                                </Text>
                            </View>
                            {system.code === unitSystem && (
                                <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Currency Section */}
                <Text style={[styles.sectionHeader, { color: colors.subText }]}>{t('currency')}</Text>
                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, padding: 0 }]}>
                    {APP_CURRENCIES.map((curr, index) => (
                        <TouchableOpacity
                            key={curr.code}
                            style={[
                                styles.langItem,
                                { borderBottomColor: colors.border },
                                index === APP_CURRENCIES.length - 1 && { borderBottomWidth: 0 }
                            ]}
                            onPress={() => switchCurrency(curr.code)}
                        >
                            <View style={styles.iconLabel}>
                                <DollarSign color={curr.code === currency ? colors.primary : colors.subText} size={20} />
                                <Text style={[
                                    styles.langText,
                                    { color: curr.code === currency ? colors.primary : colors.text },
                                    curr.code === currency && { fontWeight: 'bold' }
                                ]}>
                                    {curr.label}
                                </Text>
                            </View>
                            {curr.code === currency && (
                                <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Language Section */}
                <Text style={[styles.sectionHeader, { color: colors.subText }]}>{t('language')}</Text>
                <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border, padding: 0 }]}>
                    {LANGUAGES.map((lang, index) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[
                                styles.langItem,
                                { borderBottomColor: colors.border },
                                index === LANGUAGES.length - 1 && { borderBottomWidth: 0 }
                            ]}
                            onPress={() => switchLanguage(lang.code)}
                        >
                            <View style={styles.iconLabel}>
                                <Globe color={lang.code === locale ? colors.primary : colors.subText} size={20} />
                                <Text style={[
                                    styles.langText,
                                    { color: lang.code === locale ? colors.primary : colors.text },
                                    lang.code === locale && { fontWeight: 'bold' }
                                ]}>
                                    {lang.label}
                                </Text>
                            </View>
                            {lang.code === locale && (
                                <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        paddingBottom: 50,
    },
    section: {
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        marginBottom: 25,
        overflow: 'hidden',
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
        marginLeft: 5,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    langItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
    },
    langText: {
        fontSize: 16,
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
});
