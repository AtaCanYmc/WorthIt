import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

const DealItem = ({ deal, isBest }) => {
    const { t, colors, formatPrice } = useApp();
    const area = (Math.PI * Math.pow(deal.diameter / 2, 2) * deal.quantity).toFixed(0);

    return (
        <View style={[
            styles.container,
            { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.text },
            isBest && { borderColor: colors.success, backgroundColor: colors.successBg, borderWidth: 2 }
        ]}>
            <View style={styles.info}>
                <Text style={[styles.title, { color: colors.text }]}>{deal.quantity} x {deal.diameter} cm</Text>
                <Text style={[styles.price, { color: colors.text }]}>{formatPrice(deal.price)}</Text>
            </View>
            <View style={styles.details}>
                <Text style={[styles.detailText, { color: colors.subText }]}>{t('total_area')}: {area} cm²</Text>
                <Text style={[styles.detailText, { color: colors.subText }]}>{t('unit_price')}: {formatPrice(deal.value * 1000)}</Text>
                {/* Note: deal.value in pizza calculator is Price / Area. So Price per cm2. 
                    Usually very small number. Multiplied by 1000 or similar might be better for display?
                    Original logic was: unitPrice = price / area. 
                    Actually, let's keep it raw as before but formatted.
                 */}
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={[styles.detailText, { color: colors.subText, fontSize: 12 }]}>
                    {t('unit_price')}: {deal.value.toFixed(5)} ({formatPrice(deal.value)}/cm²)
                </Text>
            </View>
            {isBest && (
                <View style={[styles.badge, { backgroundColor: colors.success }]}>
                    <Text style={styles.badgeText}>{t('best_deal')}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
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
    },
    details: {
        flexDirection: 'column',
    },
    detailText: {
        fontSize: 14,
    },
    badge: {
        marginTop: 10,
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
