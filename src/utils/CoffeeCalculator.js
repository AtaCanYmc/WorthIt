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
        unitPrice: item.price / item.volume,
        value: item.price / item.volume // Alias for consistency
    }));

    // Find best (lowest) unit price
    const minUnitPrice = Math.min(...itemsWithUnitPrice.map(i => i.unitPrice));

    return itemsWithUnitPrice.map(item => {
        // Calculate markup compared to the best option
        // ((Current - Best) / Best) * 100

        let savings = 0;
        if (minUnitPrice > 0) {
            savings = ((item.unitPrice - minUnitPrice) / minUnitPrice) * 100;
        }

        return {
            ...item,
            isBest: item.unitPrice === minUnitPrice,
            savings: savings.toFixed(1) // Percentage string (e.g., "50.0" means 50% more expensive)
        };
    });
};
