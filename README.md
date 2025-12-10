# Smart Shopping Assistant 🛒

A professional, global-ready React Native application designed to help users make smarter shopping decisions. Compare Pizza deals by area, Coffee sizes by volume, and Market products by unit price.

## 🏗 Project Architecture

The application is built with **React Native (Expo)** and uses a modular architecture to separate concerns.

### Core Modules
*   **Pizza Module** (`src/screens/PizzaScreen.js`, `src/utils/PizzaCalculator.js`): Calculates pizza area based on diameter and quantity to find the best value per unit area. Supports Metric (cm) and Imperial (inch).
*   **Coffee Module** (`src/screens/CoffeeScreen.js`, `src/utils/CoffeeCalculator.js`): Compares coffee sizes based on volume. Standardizes dynamic presets (e.g., Tall, Grande) based on the selected unit system.
*   **Market Module** (`src/screens/MarketScreen.js`, `src/utils/MarketCalculator.js`): A generic unit price calculator for comparing any two products by weight or quantity.
*   **Settings Module** (`src/screens/SettingsScreen.js`): Manages global preferences including Language, Theme, Currency, and Unit System.

### State Management
The project uses **React Context API** (`src/context/AppContext.js`) for global state management.
*   **AppContext**: Provides `locale`, `theme`, `currency`, and `unitSystem` to all components.
*   **Persistence**: Uses `@react-native-async-storage/async-storage` to persist user preferences across app restarts.

---

## 🌍 Internationalization (i18n)

The app supports multiple languages (English, Turkish, German, French) using a dictionary-based approach.

### Structure
*   **Translations File**: `src/i18n/translations.js`
*   Contains a JSON object where top-level keys are language codes (`en`, `tr`, `de`, `fr`).

### How to Add a New Language
1.  Open `src/i18n/translations.js`.
2.  Add a new key for the language code (e.g., `es` for Spanish).
3.  Copy the keys from `en` and provide translations for the values.
4.  (Optional) Add the language option to the `LANGUAGES` array in `src/screens/SettingsScreen.js`.

---

## 📏 Unit System & Conversions

The app supports **Metric** (cm, ml, g) and **Imperial** (inch, fl oz, oz) systems.

### Implementation Logic
*   **Central Unit Logic**: `AppContext.js` contains the `unitSystem` state and `getUnitLabel` helper function.
*   **Labels**: Components subscribe to `getUnitLabel(type)` (type: 'length', 'volume', 'area', 'weight') to display the correct suffix (e.g., 'cm' vs 'in').
*   **Calculations**:
    *   **Pizza**: `PizzaCalculator.js` handles diameter logic. The formula $Area = \pi * r^2$ allows agnostic comparison, but UI inputs usually reflect the system.
    *   **Coffee**: `CoffeeScreen.js` swaps presets (`METRIC_PRESETS` vs `IMPERIAL_PRESETS`) dynamically.

### How to Add a New Conversion/Unit
1.  Update `translations.js` to include the label for the new unit keys if needed.
2.  Update `getUnitLabel` in `AppContext.js` to handle the new `type`.
3.  Update the specific calculator or screen to use the new label/type.

---

## 🚀 Getting Started

### Prerequisites
*   **Node.js**: LTS version recommended.
*   **React Native / Expo CLI**:
    ```bash
    npm install -g expo-cli
    ```

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App
*   **iOS**:
    ```bash
    npm run ios
    ```
*   **Android**:
    ```bash
    npm run android
    ```

### Running Tests
The project uses **Jest** and **React Native Testing Library** for comprehensive testing.
```bash
npm test
```
*   **Unit Tests**: Located in `src/utils/__tests__/` (Math logic).
*   **Component Tests**: Located in `src/screens/__tests__/` (UI interactions).
*   **Integration Tests**: Located in `src/context/__tests__/` (Persistence).
