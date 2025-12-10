export const COFFEE_SIZES = [
    { label: 'Tall (Küçük)', volume: 354, id: 'tall' },
    { label: 'Grande (Orta)', volume: 473, id: 'grande' },
    { label: 'Venti (Büyük)', volume: 591, id: 'venti' },
];

export const calculateCoffeeValue = (items) => {
    if (!items || items.length === 0) return [];

    // Calculate unit price (Price per mL)
    const itemsWithUnitPrice = items.map(item => ({
        ...item,
        unitPrice: item.price / item.volume
    }));

    // Find best (lowest) unit price
    const minUnitPrice = Math.min(...itemsWithUnitPrice.map(i => i.unitPrice));
    const maxUnitPrice = Math.max(...itemsWithUnitPrice.map(i => i.unitPrice));

    return itemsWithUnitPrice.map(item => {
        // Calculate savings compared to the most expensive option
        // If this IS the most expensive, savings is 0.
        // If max === min (all same value), savings 0.

        let savings = 0;
        if (maxUnitPrice > minUnitPrice) {
            savings = ((maxUnitPrice - item.unitPrice) / maxUnitPrice) * 100;
        }

        return {
            ...item,
            isBest: item.unitPrice === minUnitPrice,
            savings: savings.toFixed(1) // Percentage string
        };
    });
};
