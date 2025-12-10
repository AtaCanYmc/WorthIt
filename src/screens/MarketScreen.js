import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { compareProducts } from '../utils/MarketCalculator';
import { ShoppingCart } from 'lucide-react-native';

export default function MarketScreen() {
    const [prodA, setProdA] = useState({ price: '', quantity: '' });
    const [prodB, setProdB] = useState({ price: '', quantity: '' });
    const [result, setResult] = useState(null);

    const handleCompare = () => {
        const a = { price: parseFloat(prodA.price), quantity: parseFloat(prodA.quantity) };
        const b = { price: parseFloat(prodB.price), quantity: parseFloat(prodB.quantity) };

        const res = compareProducts(a, b);
        setResult(res);
        Keyboard.dismiss();
    };

    const handleClear = () => {
        setProdA({ price: '', quantity: '' });
        setProdB({ price: '', quantity: '' });
        setResult(null);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>🛒 Market Hesaplayıcı</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.instruction}>
                        İki ürünün fiyat ve miktarını girin, hangisinin daha avantajlı olduğunu bulun.
                    </Text>

                    <View style={styles.comparisonRow}>
                        {/* Product A */}
                        <View style={[styles.productCard, result?.betterDeal === 'A' && styles.winnerCard]}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>Ürün A</Text>
                                {result?.betterDeal === 'A' && <Text style={styles.winnerText}>AVANTAJLI</Text>}
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Fiyat (TL)"
                                keyboardType="numeric"
                                value={prodA.price}
                                onChangeText={(t) => setProdA({ ...prodA, price: t })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Miktar (gr/adet)"
                                keyboardType="numeric"
                                value={prodA.quantity}
                                onChangeText={(t) => setProdA({ ...prodA, quantity: t })}
                            />
                            {result && (
                                <Text style={styles.unitPrice}>
                                    {result.unitPriceA?.toFixed(4)} TL/birim
                                </Text>
                            )}
                        </View>

                        {/* Product B */}
                        <View style={[styles.productCard, result?.betterDeal === 'B' && styles.winnerCard]}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>Ürün B</Text>
                                {result?.betterDeal === 'B' && <Text style={styles.winnerText}>AVANTAJLI</Text>}
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Fiyat (TL)"
                                keyboardType="numeric"
                                value={prodB.price}
                                onChangeText={(t) => setProdB({ ...prodB, price: t })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Miktar (gr/adet)"
                                keyboardType="numeric"
                                value={prodB.quantity}
                                onChangeText={(t) => setProdB({ ...prodB, quantity: t })}
                            />
                            {result && (
                                <Text style={styles.unitPrice}>
                                    {result.unitPriceB?.toFixed(4)} TL/birim
                                </Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.compareButton} onPress={handleCompare}>
                        <Text style={styles.compareBtnText}>KARŞILAŞTIR</Text>
                    </TouchableOpacity>

                    {result && (
                        <View style={styles.resultContainer}>
                            {result.betterDeal === 'EQUAL' ? (
                                <Text style={styles.resultText}>İki ürünün birim fiyatı da aynı!</Text>
                            ) : (
                                <Text style={styles.resultText}>
                                    <Text style={{ fontWeight: 'bold' }}>Ürün {result.betterDeal}</Text>, diğerine göre
                                    <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}> %{result.savingsPercent} </Text>
                                    daha hesaplı!
                                </Text>
                            )}
                            <TouchableOpacity onPress={handleClear}>
                                <Text style={styles.clearText}>Temizle ve Yeni Hesapla</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    scrollContent: {
        padding: 20,
    },
    instruction: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    comparisonRow: {
        flexDirection: 'row',
        gap: 15,
    },
    productCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    winnerCard: {
        borderColor: '#4CAF50',
        backgroundColor: '#F1F8E9',
    },
    cardHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        height: 40,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    winnerText: {
        fontSize: 10,
        color: '#4CAF50',
        fontWeight: '900',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fafafa',
    },
    unitPrice: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginTop: 5,
    },
    compareButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 25,
        shadowColor: "#2196F3",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    compareBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
    resultContainer: {
        marginTop: 30,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        marginBottom: 15,
    },
    clearText: {
        color: '#2196F3',
        marginTop: 10,
    }
});
