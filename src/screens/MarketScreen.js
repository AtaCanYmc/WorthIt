import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { compareProducts } from '../utils/MarketCalculator';
import { ShoppingCart } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export default function MarketScreen() {
    const [prodA, setProdA] = useState({ price: '', quantity: '' });
    const [prodB, setProdB] = useState({ price: '', quantity: '' });
    const [result, setResult] = useState(null);
    const { t, colors } = useApp();

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

    const getComparisonText = () => {
        if (!result) return null;
        if (result.betterDeal === 'EQUAL') {
            return t('equal_price');
        }

        // This is a bit complex for simple interpolation, so I'll handle styling manually here for now,
        // or we could use a library like react-native-i18n for rich text, but keeping it simple as per instructions.
        // We will construct the logical parts.

        const winner = result.betterDeal;
        const percent = result.savingsPercent;

        // "Product {winner} is %{percent}% cheaper!"
        // We'll return a React Node for custom styling
        return (
            <Text style={[styles.resultText, { color: colors.text }]}>
                <Text style={{ fontWeight: 'bold' }}>{winner === 'A' ? t('product_a') : t('product_b')}</Text>
                {' '}{t('more_expensive').split('%{percent}%')[1] ? '... ' : ' '}
                {/* Re-using logic or just simplifying for this specific sentence structure challenge without complex i18n lib */}
                {/* Let's simplify and use the hardcoded structure but with translated labels to be safe */}

                {locale === 'en' ? ` is ` : `, diğerine göre `}
                <Text style={{ color: colors.success, fontWeight: 'bold' }}>%{percent} </Text>
                {locale === 'en' ? ` cheaper!` : ` daha hesaplı!`}
            </Text>
        );
    };

    // Better Approach for clean code:
    // We already have t('cheaper_alert', { winner, percent }). 
    // But basic t() returns string. We need to render it.
    // Let's implement a simple parser for <bold> and <green> in the render.

    const renderStyledText = (textWithTags) => {
        const parts = textWithTags.split(/(<bold>.*?<\/bold>|<green>.*?<\/green>)/g);
        return (
            <Text style={[styles.resultText, { color: colors.text }]}>
                {parts.map((part, index) => {
                    if (part.startsWith('<bold>')) {
                        return <Text key={index} style={{ fontWeight: 'bold' }}>{part.replace(/<\/?bold>/g, '')}</Text>;
                    }
                    if (part.startsWith('<green>')) {
                        return <Text key={index} style={{ color: colors.success, fontWeight: 'bold' }}>{part.replace(/<\/?green>/g, '')}</Text>;
                    }
                    return <Text key={index}>{part}</Text>;
                })}
            </Text>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                    <Text style={[styles.headerTitle, { color: colors.marketTitle }]}>{t('market_calculator')}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={[styles.instruction, { color: colors.subText }]}>
                        {t('market_instruction')}
                    </Text>

                    <View style={styles.comparisonRow}>
                        {/* Product A */}
                        <View style={[
                            styles.productCard,
                            { backgroundColor: colors.card, borderColor: 'transparent' },
                            result?.betterDeal === 'A' && { borderColor: colors.success, backgroundColor: colors.successBg }
                        ]}>
                            <View style={styles.cardHeader}>
                                <Text style={[styles.cardTitle, { color: colors.text }]}>{t('product_a')}</Text>
                                {result?.betterDeal === 'A' && <Text style={[styles.winnerText, { color: colors.success }]}>{t('advantage')}</Text>}
                            </View>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                                placeholder={t('price')}
                                placeholderTextColor={colors.subText}
                                keyboardType="numeric"
                                value={prodA.price}
                                onChangeText={(t) => setProdA({ ...prodA, price: t })}
                            />
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                                placeholder={t('quantity')}
                                placeholderTextColor={colors.subText}
                                keyboardType="numeric"
                                value={prodA.quantity}
                                onChangeText={(t) => setProdA({ ...prodA, quantity: t })}
                            />
                            {result && (
                                <Text style={[styles.unitPrice, { color: colors.subText }]}>
                                    {result.unitPriceA?.toFixed(4)} TL/{t('per_unit')}
                                </Text>
                            )}
                        </View>

                        {/* Product B */}
                        <View style={[
                            styles.productCard,
                            { backgroundColor: colors.card, borderColor: 'transparent' },
                            result?.betterDeal === 'B' && { borderColor: colors.success, backgroundColor: colors.successBg }
                        ]}>
                            <View style={styles.cardHeader}>
                                <Text style={[styles.cardTitle, { color: colors.text }]}>{t('product_b')}</Text>
                                {result?.betterDeal === 'B' && <Text style={[styles.winnerText, { color: colors.success }]}>{t('advantage')}</Text>}
                            </View>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                                placeholder={t('price')}
                                placeholderTextColor={colors.subText}
                                keyboardType="numeric"
                                value={prodB.price}
                                onChangeText={(t) => setProdB({ ...prodB, price: t })}
                            />
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                                placeholder={t('quantity')}
                                placeholderTextColor={colors.subText}
                                keyboardType="numeric"
                                value={prodB.quantity}
                                onChangeText={(t) => setProdB({ ...prodB, quantity: t })}
                            />
                            {result && (
                                <Text style={[styles.unitPrice, { color: colors.subText }]}>
                                    {result.unitPriceB?.toFixed(4)} TL/{t('per_unit')}
                                </Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.compareButton, { backgroundColor: colors.marketTitle }]} onPress={handleCompare}>
                        <Text style={styles.compareBtnText}>{t('compare')}</Text>
                    </TouchableOpacity>

                    {result && (
                        <View style={[styles.resultContainer, { backgroundColor: colors.card }]}>
                            {result.betterDeal === 'EQUAL' ? (
                                <Text style={[styles.resultText, { color: colors.text }]}>{t('equal_price')}</Text>
                            ) : (
                                renderStyledText(t('cheaper_alert', {
                                    winner: result.betterDeal === 'A' ? t('product_a') : t('product_b'),
                                    percent: result.savingsPercent
                                }))
                            )}
                            <TouchableOpacity onPress={handleClear}>
                                <Text style={[styles.clearText, { color: colors.marketTitle }]}>{t('clear_and_new')}</Text>
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
    scrollContent: {
        padding: 20,
    },
    instruction: {
        textAlign: 'center',
        marginBottom: 20,
    },
    comparisonRow: {
        flexDirection: 'row',
        gap: 15,
    },
    productCard: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    },
    winnerText: {
        fontSize: 10,
        fontWeight: '900',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    unitPrice: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
    },
    compareButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 25,
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
        borderRadius: 12,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 15,
    },
    clearText: {
        marginTop: 10,
    }
});
