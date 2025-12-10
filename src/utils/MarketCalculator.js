export const compareProducts = (productA, productB) => {
    // Expect product: { price: number, quantity: number }
    if (!productA.price || !productA.quantity || !productB.price || !productB.quantity) {
        return null;
    }

    const unitPriceA = productA.price / productA.quantity;
    const unitPriceB = productB.price / productB.quantity;

    return {
        unitPriceA,
        unitPriceB,
        betterDeal: unitPriceA < unitPriceB ? 'A' : (unitPriceB < unitPriceA ? 'B' : 'EQUAL'),
        savingsPercent: unitPriceA < unitPriceB
            ? ((unitPriceB - unitPriceA) / unitPriceB * 100).toFixed(1)
            : ((unitPriceA - unitPriceB) / unitPriceA * 100).toFixed(1)
    };
};
