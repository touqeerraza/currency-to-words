# currency-to-words-util

currency-to-words is a lightweight library that converts numeric values into readable word formats, supporting multiple currencies with customizable configurations for main and subunits. Ideal for invoices, receipts, or financial applications.

## Installation

Install the package via npm:

```bash
npm install currency-to-words-util
```
Or with Yarn:

```bash
yarn add currency-to-words-util
```

## Importing

You can import the library into your project using ES6 imports:

```typescript
import { convertToWords } from 'currency-to-words-util';
```
## Usage

Here's how to use the library:

```typescript
import currencyToWords from "currency-to-words-util";

const result = currencyToWords({
  value: 1234.56,
  suffix: true,
  currencyConfig: {
    mainUnit: "DOLLAR",
    subUnit: "CENT",
  },
});

console.log(result);
// Output: ONE THOUSAND TWO HUNDRED THIRTY-FOUR DOLLARS AND FIFTY-SIX CENTS ONLY
```

## **Options**

### `currencyToWords({ value, suffix, currencyConfig })`

| Parameter       | Type                          | Default                          | Description                                                                 |
|-----------------|-------------------------------|----------------------------------|-----------------------------------------------------------------------------|
| `value`         | `number`           | `undefined`                      | The amount to convert into words.                                           |
| `suffix`        | `string , boolean` (optional)  | `"ONLY"`                         | The suffix to add at the end of the result (e.g., `"ONLY"`).      |
| `currencyConfig`| `CurrencyConfig` (optional)  | `{ mainUnit: "RUPEE", subUnit: "PAISA" }` | Configuration for the main and subunits of the currency.                   |

#### **CurrencyConfig**

| Property    | Type      | Description                               |
|-------------|-----------|-------------------------------------------|
| `mainUnit`  | `string`  | Name of the main currency unit (e.g., "DOLLAR"). |
| `subUnit`   | `string`  | Name of the subunit (e.g., "CENT").        |

## Features 

- Support for multiple currencies through customizable configurations.
  
- Handles both whole numbers and fractional parts.
  
- Lightweight and easy to integrate.
  
- Fully customizable suffix and output formatting.
  