import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COFFEE_SIZES, calculateCoffeeValue } from '../utils/CoffeeCalculator';
import { Plus, Trash2, Coffee } from 'lucide-react-native';

export default function CoffeeScreen() {
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState('');
    const [volume, setVolume] = useState('');
    const [name, setName] = useState('');
    const [selectedPreset, setSelectedPreset] = useState(null);

    const handleSelectPreset = (size) => {
        setSelectedPreset(size.id);
        setName(size.label.split(' ')[0]); // Just "Tall", "Grande" etc
        setVolume(size.volume.toString());
    };

    const handleAddItem = () => {
        if (!price || !volume || !name) {
            Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
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

        // Reset form
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
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>☕ Kahve Kıyasla</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Presets */}
                    <View style={styles.presetsContainer}>
                        <Text style={styles.sectionTitle}>Hızlı Seçim:</Text>
                        <View style={styles.presetsRow}>
                            {COFFEE_SIZES.map((size) => (
                                <TouchableOpacity
                                    key={size.id}
                                    style={[styles.presetBtn, selectedPreset === size.id && styles.presetBtnActive]}
                                    onPress={() => handleSelectPreset(size)}
                                >
                                    <Text style={[styles.presetText, selectedPreset === size.id && styles.presetTextActive]}>
                                        {size.label.split(' ')[0]}
                                    </Text>
                                    <Text style={[styles.presetSubText, selectedPreset === size.id && styles.presetTextActive]}>
                                        {size.volume}ml
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Input Form */}
                    <View style={styles.inputCard}>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={[styles.input, { flex: 2 }]}
                                placeholder="İsim (Örn: XL)"
                                value={name}
                                onChangeText={setName}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="ml"
                                keyboardType="numeric"
                                value={volume}
                                onChangeText={setVolume}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="TL"
                                keyboardType="numeric"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                            <Plus color="white" size={24} />
                            <Text style={styles.addButtonText}>Ekle</Text>
                        </TouchableOpacity>
                    </View>

                    {/* List */}
                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Sonuçlar:</Text>

                    {items.map((item) => (
                        <View key={item.id} style={[styles.resultCard, item.isBest && styles.bestResultCard]}>
                            <View style={styles.resultInfo}>
                                <Text style={styles.resultName}>{item.name} ({item.volume}ml)</Text>
                                <Text style={styles.resultPrice}>{item.price} TL</Text>
                            </View>

                            {item.isBest ? (
                                <View style={styles.badgeContainer}>
                                    <Text style={styles.badgeText}>En Avantajlı</Text>
                                </View>
                            ) : (
                                <View style={styles.savingsContainer}>
                                    {parseFloat(item.savings) > 0 && <Text style={styles.savingsText}>%{item.savings} daha pahalı</Text>}
                                </View>
                            )}

                            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.deleteBtn}>
                                <Trash2 size={20} color="#999" />
                            </TouchableOpacity>
                        </View>
                    ))}

                    {items.length === 0 && (
                        <View style={styles.emptyState}>
                            <Coffee size={48} color="#ddd" />
                            <Text style={styles.emptyText}>Kahve fiyatlarını girin, kıyaslayalım.</Text>
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
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#795548', // Coffee color
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#555',
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
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    presetBtnActive: {
        backgroundColor: '#795548',
        borderColor: '#795548',
    },
    presetText: {
        fontWeight: 'bold',
        color: '#555',
    },
    presetSubText: {
        fontSize: 12,
        color: '#888',
    },
    presetTextActive: {
        color: '#fff',
    },
    inputCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
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
        borderColor: '#eee',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    addButton: {
        backgroundColor: '#795548',
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
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    bestResultCard: {
        borderColor: '#4CAF50',
        backgroundColor: '#E8F5E9',
    },
    resultInfo: {
        flex: 1,
    },
    resultName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    resultPrice: {
        fontSize: 14,
        color: '#666',
    },
    badgeContainer: {
        backgroundColor: '#4CAF50',
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
        color: '#d32f2f',
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
        color: '#999',
    }
});
