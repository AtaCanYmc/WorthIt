import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddDealForm from '../components/AddDealForm';
import DealItem from '../components/DealItem';
import { compareDeals } from '../utils/PizzaCalculator';
import { useApp } from '../context/AppContext';

export default function PizzaScreen() {
    const [deals, setDeals] = useState([]);
    const { t, colors, theme } = useApp();

    const handleAddDeal = (newDeal) => {
        const updatedDeals = [...deals, newDeal];
        const sortedDeals = compareDeals(updatedDeals);
        setDeals(sortedDeals);
    };

    const handleClear = () => {
        setDeals([]);
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
                            <DealItem deal={item} isBest={index === 0} />
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
