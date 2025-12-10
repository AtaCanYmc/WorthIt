
// src/utils/__tests__/Calculators.test.js
const { calculateCoffeeValue } = require('../CoffeeCalculator');
const { compareProducts } = require('../MarketCalculator');
const { calculatePizzaValue } = require('../PizzaCalculator');

describe('Coffee Calculator Logic', () => {
    test('Calculates value correctly (Price / Volume)', () => {
        const item = { price: 100, volume: 500 }; // 0.2 per ml
        const results = calculateCoffeeValue([item]);
        expect(results[0].value).toBeCloseTo(0.2);
    });

    test('Identifies best value correctly', () => {
        const items = [
            { id: 1, price: 100, volume: 500 }, // 0.2
            { id: 2, price: 150, volume: 1000 }, // 0.15 (Better)
        ];
        const results = calculateCoffeeValue(items);
        expect(results.find(i => i.id === 2).isBest).toBe(true);
        expect(results.find(i => i.id === 1).isBest).toBe(false);
    });

    test('Calculates savings percent', () => {
        const items = [
            { id: 1, price: 200, volume: 1000 }, // 0.2 (Expensive)
            { id: 2, price: 100, volume: 1000 }, // 0.1 (Best)
        ];
        const results = calculateCoffeeValue(items);
        // Formula: ((Value - BestValue) / BestValue) * 100
        // ((0.2 - 0.1) / 0.1) * 100 = 100%
        // Expect "100.0" because toFixed(1)
        expect(results.find(i => i.id === 1).savings).toBe("100.0");
    });
});

describe('Market Calculator Logic', () => {
    test('Compares two products correctly', () => {
        const A = { price: 10, quantity: 100 }; // 0.1
        const B = { price: 15, quantity: 200 }; // 0.075 (Better)
        const result = compareProducts(A, B);
        expect(result.betterDeal).toBe('B');
    });

    test('Handles equal value', () => {
        const A = { price: 10, quantity: 100 };
        const B = { price: 10, quantity: 100 };
        const result = compareProducts(A, B);
        expect(result.betterDeal).toBe('EQUAL');
    });
});

describe('Pizza Calculator Logic', () => {
    test('Calculates area and value for Metric (cm)', () => {
        // 1 pizza, 30cm, 200 TL
        // Area: PI * (15)^2 * 1 = 706.85
        // Value: 200 / 706.85
        const items = [{ id: 1, quantity: 1, diameter: 30, price: 200 }];
        const result = calculatePizzaValue(items);
        const area = Math.PI * Math.pow(15, 2);

        expect(result[0].area).toBeCloseTo(area);
        expect(result[0].value).toBeCloseTo(200 / area);
    });

    test('Calculates area for Imperial (inch)', () => {
        // 1 pizza, 12 inch
        // Area: PI * (6)^2 = 113.09 in2
        const items = [{ id: 1, quantity: 1, diameter: 12, price: 20 }];
        const result = calculatePizzaValue(items);
        const area = Math.PI * Math.pow(6, 2);

        expect(result[0].area).toBeCloseTo(area);
    });

    test('Identifies best pizza deal', () => {
        // Pizza A: 30cm, 200 TL (Value ~ 0.28 TL/cm2)
        // Pizza B: 20cm, 50 TL (Area ~ 314, Value ~ 0.15 TL/cm2) -> Better
        const items = [
            { id: 1, quantity: 1, diameter: 30, price: 200 },
            { id: 2, quantity: 1, diameter: 20, price: 50 },
        ];
        const result = calculatePizzaValue(items);
        expect(result.find(i => i.id === 2).isBest).toBe(true);
    });
});

// Since PizzaCalculator logic might be inline or imported, let's verify if we need to extract it or test the component logic. 
// Pizza logic is imported from `../utils/PizzaCalculator` in PizzaScreen. Let's check if that file exists or if I need to create it/mock it.
// Checking file...
