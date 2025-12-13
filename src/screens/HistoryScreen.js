import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { Pizza, Coffee, ShoppingCart, Trash2, Clock } from 'lucide-react-native';

export default function HistoryScreen() {
    const { t, colors, history, removeFromHistory, clearAllHistory } = useApp();

    const getIcon = (module) => {
        switch (module) {
            case 'pizza': return <Pizza color={colors.primary} size={24} />;
            case 'coffee': return <Coffee color={colors.primary} size={24} />;
            case 'market': return <ShoppingCart color={colors.primary} size={24} />;
            default: return <Clock color={colors.primary} size={24} />;
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const handleClearAll = () => {
        Alert.alert(
            t('clear_history'),
            t('are_you_sure'), // Need to add this key or just use generic confirmation text if acceptable
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: clearAllHistory, style: 'destructive' }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.text }]}>
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    {getIcon(item.module)}
                    <Text style={[styles.moduleName, { color: colors.text }]}>{t(item.module)}</Text>
                </View>
                <Text style={[styles.date, { color: colors.subText }]}>{formatDate(item.timestamp)}</Text>
            </View>

            <View style={styles.summaryContainer}>
                <Text style={[styles.summary, { color: colors.text }]}>{item.resultSummary}</Text>
            </View>

            <View style={[styles.footer, { borderTopColor: colors.border }]}>
                <TouchableOpacity onPress={() => removeFromHistory(item.id)} style={styles.deleteButton}>
                    <Trash2 size={16} color={colors.error || 'red'} />
                    <Text style={[styles.deleteText, { color: colors.error || 'red' }]}>{t('delete') || 'Delete'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
            <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{t('history')}</Text>
                {history.length > 0 && (
                    <TouchableOpacity onPress={handleClearAll}>
                        <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{t('clear')}</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={history}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Clock size={48} color={colors.subText} />
                        <Text style={[styles.emptyText, { color: colors.subText }]}>{t('no_history')}</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
    },
    card: {
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    moduleName: {
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'capitalize',
    },
    date: {
        fontSize: 12,
    },
    summaryContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    summary: {
        fontSize: 14,
        lineHeight: 20,
    },
    footer: {
        borderTopWidth: 1,
        padding: 10,
        alignItems: 'flex-end',
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    deleteText: {
        fontSize: 12,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        gap: 20,
    },
    emptyText: {
        fontSize: 16,
    }
});
