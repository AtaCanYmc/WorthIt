import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';

const AddDealForm = ({ onAddDeal }) => {
    const [quantity, setQuantity] = useState('1');
    const [diameter, setDiameter] = useState('');
    const [price, setPrice] = useState('');
    const { t, colors } = useApp();

    const handleSubmit = () => {
        if (!quantity || !diameter || !price) return;

        onAddDeal({
            quantity: parseInt(quantity),
            diameter: parseFloat(diameter),
            price: parseFloat(price),
            id: Date.now().toString(),
        });

        setQuantity('1');
        setDiameter('');
        setPrice('');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.text }]}>
            <Text style={[styles.header, { color: colors.text }]}>{t('add_deal')}</Text>
            <View style={styles.row}>
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.subText }]}>{t('quantity')}</Text>
                    <TextInput
                        style={[styles.input, { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text }]}
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                        placeholder="1"
                        placeholderTextColor={colors.subText}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.subText }]}>{t('diameter')}</Text>
                    <TextInput
                        style={[styles.input, { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text }]}
                        value={diameter}
                        onChangeText={setDiameter}
                        keyboardType="numeric"
                        placeholder="30"
                        placeholderTextColor={colors.subText}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: colors.subText }]}>{t('price')}</Text>
                    <TextInput
                        style={[styles.input, { borderColor: colors.border, backgroundColor: colors.inputBg, color: colors.text }]}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholder="200"
                        placeholderTextColor={colors.subText}
                    />
                </View>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSubmit}>
                <Text style={styles.buttonText}>{t('add_to_list')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputGroup: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddDealForm;
