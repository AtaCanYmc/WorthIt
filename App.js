import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import AddDealForm from './components/AddDealForm';
import DealItem from './components/DealItem';
import { compareDeals } from './utils/PizzaCalculator';

export default function App() {
  const [deals, setDeals] = useState([]);

  const handleAddDeal = (newDeal) => {
    const updatedDeals = [...deals, newDeal];
    const sortedDeals = compareDeals(updatedDeals);
    setDeals(sortedDeals);
  };

  const handleClear = () => {
    setDeals([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🍕 Pizza Hesaplayıcı</Text>
        </View>

        <View style={styles.content}>
          <AddDealForm onAddDeal={handleAddDeal} />

          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Karşılaştırma Listesi</Text>
            {deals.length > 0 && (
              <Text style={styles.clearButton} onPress={handleClear}>Temizle</Text>
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
              <Text style={styles.emptyText}>Henüz pizza eklenmedi.</Text>
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
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5722',
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
    color: '#333',
  },
  clearButton: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
