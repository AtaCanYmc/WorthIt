const { calculatePizzaArea, calculateDealValue, compareDeals } = require('./utils/PizzaCalculator');

// Mocking the math for node environment if needed, but the utils are pure JS so it should be fine.

console.log("--- Testing Pizza Calculator Logic ---");

// Scenario 1: User Example
// 3x 20cm for 250 vs 1x 30cm for 200
const deal1 = { id: '1', quantity: 3, diameter: 20, price: 250 };
const deal2 = { id: '2', quantity: 1, diameter: 30, price: 200 };

const deals = [deal1, deal2];
const sortedDeals = compareDeals(deals);

console.log("\nScenario 1: 3x20cm (250) vs 1x30cm (200)");
sortedDeals.forEach((deal, index) => {
    const area = (Math.PI * Math.pow(deal.diameter / 2, 2) * deal.quantity).toFixed(2);
    console.log(`${index + 1}. ${deal.quantity}x${deal.diameter}cm - Price: ${deal.price} - Area: ${area} - Value: ${deal.value.toFixed(4)}`);
});

if (sortedDeals[0].id === '1') {
    console.log("PASS: 3x20cm is better value.");
} else {
    console.log("FAIL: 1x30cm is better value (Unexpected).");
}

// Scenario 2: Equal Value
const deal3 = { id: '3', quantity: 1, diameter: 20, price: 100 };
const deal4 = { id: '4', quantity: 4, diameter: 10, price: 100 };
// Area 1: pi*100 = 314
// Area 2: 4 * pi*25 = 100pi = 314
// Should be equal value

const equalDeals = compareDeals([deal3, deal4]);
console.log("\nScenario 2: Equal Value Check");
equalDeals.forEach((deal, index) => {
    console.log(`${index + 1}. ${deal.quantity}x${deal.diameter}cm - Value: ${deal.value.toFixed(4)}`);
});

console.log("\n--- Test Complete ---");
