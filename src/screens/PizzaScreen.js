import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddDealForm from '../components/AddDealForm';
import DealItem from '../components/DealItem';
import { Plus, Trash2, Pizza } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { calculatePizzaValue } from '../utils/PizzaCalculator';

export default function PizzaScreen() {
    const [deals, setDeals] = useState([]);
    const { t, colors, theme, addToHistory, getUnitLabel } = useApp();

    const handleAddDeal = (deal) => {
        const newDeal = {
            id: deal.id,
            quantity: deal.quantity,
            diameter: deal.diameter,
            price: deal.price
        };

        const newDeals = [...deals, newDeal];
        setDeals(calculatePizzaValue(newDeals));

        // Save to History
        addToHistory({
            module: 'pizza',
            resultSummary: `${deal.quantity}x ${deal.diameter}${getUnitLabel('length')} @ ${deal.price}`,
        });
    };

    const handleClear = () => {
        setDeals([]);
    };

    const removeDeal = (id) => {
        const newDeals = deals.filter(d => d.id !== id);
        setDeals(calculatePizzaValue(newDeals));
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                    <Text style={[styles.headerTitle, { color: colors.primary }]}>{t('pizza_calculator')}</Text>
                </View>

                <View style={styles.content}>
                    <AddDealForm onAddDeal={handleAddDeal} />

                    <View style={styles.listHeader}>
                        <Text style={[styles.listTitle, { color: colors.text }]}>{t('compare_list')}</Text>
                        {deals.length > 0 && (
                            <Text style={[styles.clearButton, { color: colors.primary }]} onPress={handleClear}>{t('clear')}</Text>
                        )}
                    </View>

                    <FlatList
                        data={deals}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <DealItem deal={item} isBest={index === 0} onRemove={removeDeal} />
                        )}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <Text style={[styles.emptyText, { color: colors.subText }]}>{t('empty_list_pizza')}</Text>
                        }
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearButton: {
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontStyle: 'italic',
    },
});
