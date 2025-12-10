import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COFFEE_SIZES, calculateCoffeeValue } from '../utils/CoffeeCalculator';
import { Plus, Trash2, Coffee } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export default function CoffeeScreen() {
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState('');
    const [volume, setVolume] = useState('');
    const [name, setName] = useState('');
    const [selectedPreset, setSelectedPreset] = useState(null);
    const { t, colors, formatPrice } = useApp();

    const handleSelectPreset = (size) => {
        setSelectedPreset(size.id);
        setName(size.label.split(' ')[0]);
        setVolume(size.volume.toString());
    };

    const handleAddItem = () => {
        if (!price || !volume || !name) {
            Alert.alert(t('missing_info'), t('fill_all_fields'));
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            name,
            volume: parseFloat(volume),
            price: parseFloat(price)
        };

        const newItems = [...items, newItem];
        setItems(calculateCoffeeValue(newItems));

        setPrice('');
        setVolume('');
        setName('');
        setSelectedPreset(null);
    };

    const handleRemoveItem = (id) => {
        const newItems = items.filter(i => i.id !== id);
        setItems(calculateCoffeeValue(newItems));
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
                    <Text style={[styles.headerTitle, { color: colors.coffeeTitle }]}>{t('coffee_compare')}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Presets */}
                    <View style={styles.presetsContainer}>
                        <Text style={[styles.sectionTitle, { color: colors.subText }]}>{t('quick_select')}</Text>
                        <View style={styles.presetsRow}>
                            {COFFEE_SIZES.map((size) => (
                                <TouchableOpacity
                                    key={size.id}
                                    style={[
                                        styles.presetBtn,
                                        { backgroundColor: colors.card, borderColor: colors.border },
                                        selectedPreset === size.id && { backgroundColor: colors.coffeeTitle, borderColor: colors.coffeeTitle }
                                    ]}
                                    onPress={() => handleSelectPreset(size)}
                                >
                                    <Text style={[
                                        styles.presetText,
                                        { color: colors.subText },
                                        selectedPreset === size.id && { color: '#fff' }
                                    ]}>
                                        {size.label.split(' ')[0]}
                                    </Text>
                                    <Text style={[
                                        styles.presetSubText,
                                        { color: colors.subText },
                                        selectedPreset === size.id && { color: '#efefef' }
                                    ]}>
                                        {size.volume}ml
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Input Form */}
                    <View style={[styles.inputCard, { backgroundColor: colors.card, shadowColor: colors.text }]}>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={[styles.input, { flex: 2, backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                                placeholder={t('name_placeholder')}
                                placeholderTextColor={colors.subText}
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1, backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                                placeholder="ml"
                                placeholderTextColor={colors.subText}
                                keyboardType="numeric"
                                value={volume}
                                onChangeText={setVolume}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1, backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.text }]}
                                placeholder={t('price')}
                                placeholderTextColor={colors.subText}
                                keyboardType="numeric"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>
                        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.coffeeTitle }]} onPress={handleAddItem}>
                            <Plus color="white" size={24} />
                            <Text style={styles.addButtonText}>{t('add')}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* List */}
                    <Text style={[styles.sectionTitle, { marginTop: 20, color: colors.subText }]}>{t('results')}</Text>

                    {items.map((item) => (
                        <View key={item.id} style={[
                            styles.resultCard,
                            { backgroundColor: colors.card, borderColor: colors.border },
                            item.isBest && { borderColor: colors.success, backgroundColor: colors.successBg }
                        ]}>
                            <View style={styles.resultInfo}>
                                <Text style={[styles.resultName, { color: colors.text }]}>{item.name} ({item.volume}ml)</Text>
                                <Text style={[styles.resultPrice, { color: colors.subText }]}>{formatPrice(item.price)}</Text>
                            </View>

                            {item.isBest ? (
                                <View style={[styles.badgeContainer, { backgroundColor: colors.success }]}>
                                    <Text style={styles.badgeText}>{t('best_value')}</Text>
                                </View>
                            ) : (
                                <View style={styles.savingsContainer}>
                                    {parseFloat(item.savings) > 0 && <Text style={[styles.savingsText, { color: colors.error }]}>
                                        {t('more_expensive', { percent: item.savings })}
                                    </Text>}
                                </View>
                            )}

                            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.deleteBtn}>
                                <Trash2 size={20} color={colors.subText} />
                            </TouchableOpacity>
                        </View>
                    ))}

                    {items.length === 0 && (
                        <View style={styles.emptyState}>
                            <Coffee size={48} color={colors.border} />
                            <Text style={[styles.emptyText, { color: colors.subText }]}>{t('empty_list_coffee')}</Text>
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    presetsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    presetBtn: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    presetText: {
        fontWeight: 'bold',
    },
    presetSubText: {
        fontSize: 12,
    },
    inputCard: {
        padding: 15,
        borderRadius: 12,
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    inputRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    addButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        gap: 5,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resultCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    resultInfo: {
        flex: 1,
    },
    resultName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultPrice: {
        fontSize: 14,
    },
    badgeContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 10,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    savingsContainer: {
        marginRight: 10,
    },
    savingsText: {
        fontSize: 12,
    },
    deleteBtn: {
        padding: 5,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 50,
        gap: 10,
    },
    emptyText: {
    }
});
