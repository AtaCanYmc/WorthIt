import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const AddDealForm = ({ onAddDeal }) => {
    const [quantity, setQuantity] = useState('1');
    const [diameter, setDiameter] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = () => {
        if (!quantity || !diameter || !price) return;

        onAddDeal({
            quantity: parseInt(quantity),
            diameter: parseFloat(diameter),
            price: parseFloat(price),
            id: Date.now().toString(),
        });

        // Reset form (keep quantity as 1 usually)
        setQuantity('1');
        setDiameter('');
        setPrice('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Yeni Pizza Ekle</Text>
            <View style={styles.row}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Adet</Text>
                    <TextInput
                        style={styles.input}
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                        placeholder="1"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Çap (cm)</Text>
                    <TextInput
                        style={styles.input}
                        value={diameter}
                        onChangeText={setDiameter}
                        keyboardType="numeric"
                        placeholder="30"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Fiyat</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholder="200"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Listeye Ekle</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
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
        color: '#666',
        marginBottom: 5,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#FF5722',
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
