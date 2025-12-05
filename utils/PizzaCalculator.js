
export const calculatePizzaArea = (diameter) => {
    const radius = diameter / 2;
    return Math.PI * Math.pow(radius, 2);
};

export const calculateDealValue = (quantity, diameter, price) => {
    const totalArea = quantity * calculatePizzaArea(diameter);
    if (totalArea === 0) return 0;
    // Price per square unit (lower is better)
    return price / totalArea;
};

export const compareDeals = (deals) => {
    return deals.map(deal => {
        const value = calculateDealValue(deal.quantity, deal.diameter, deal.price);
        return { ...deal, value };
    }).sort((a, b) => a.value - b.value);
};
