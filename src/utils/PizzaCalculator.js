
export const calculatePizzaValue = (deals) => {
    if (!deals || deals.length === 0) return [];

    // Calculate Area and Unit Price (Value) for each
    const processed = deals.map(deal => {
        const radius = deal.diameter / 2;
        const area = Math.PI * Math.pow(radius, 2) * deal.quantity;
        const value = deal.price / area; // Price per unit area (Lower is better)
        return { ...deal, area, value };
    });

    // Find best deal (lowest value)
    const bestDeal = processed.reduce((min, p) => p.value < min.value ? p : min, processed[0]);

    return processed.map(p => ({
        ...p,
        isBest: p.id === bestDeal.id,
        savings: p.id === bestDeal.id ? 0 : ((p.value - bestDeal.value) / bestDeal.value * 100).toFixed(0)
    }));
};
