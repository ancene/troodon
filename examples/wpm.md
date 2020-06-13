## Weighted Product Model (WPM) Algorithm Examples

choose the one you like

```typescript
import { wpm, Attribute } from "https://deno.land/x/troodon/mod.ts"; // Official Third Party Modules
// OR
import { wpm, Attribute } from "https://denoland.id/x/troodon/mod.ts"; // Indonesia Third Party Modules
```

[Problems example 1](http://pixelbali.com/informasi-teknologi/contoh-perhitungan-metode-weighted-product.html)

```typescript
const alternatives = ["M", "W", "G"];

const criterias = [
  [42, 66000, 60, 75, 2355],
  [50, 90000, 72, 60, 1421],
  [63, 91500, 65, 80, 2585],
];
const weights = [5, 3, 4, 4, 2];

const attributes = [
  Attribute.BENEFIT,
  Attribute.COST,
  Attribute.BENEFIT,
  Attribute.BENEFIT,
  Attribute.COST,
];

console.log(wpm(alternatives, criterias, weights, attributes));
```
