import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DealItem = ({ deal, isBest }) => {
    const area = (Math.PI * Math.pow(deal.diameter / 2, 2) * deal.quantity).toFixed(0);

    return (
        <View style={[styles.container, isBest && styles.bestContainer]}>
            <View style={styles.info}>
                <Text style={styles.title}>{deal.quantity} x {deal.diameter} cm</Text>
                <Text style={styles.price}>{deal.price} TL</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.detailText}>Toplam Alan: {area} cm²</Text>
                <Text style={styles.detailText}>Birim Fiyat: {deal.value.toFixed(4)}</Text>
            </View>
            {isBest && <View style={styles.badge}><Text style={styles.badgeText}>En Avantajlı!</Text></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#eee',
    },
    bestContainer: {
        borderColor: '#4CAF50',
        backgroundColor: '#F1F8E9',
        borderWidth: 2,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailText: {
        color: '#666',
        fontSize: 14,
    },
    badge: {
        marginTop: 10,
        backgroundColor: '#4CAF50',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default DealItem;
