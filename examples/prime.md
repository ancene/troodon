## Prime Number (Prime) Algorithm Examples

choose the one you like

```typescript
import { isPrime, listPrimes } from "https://deno.land/x/troodon/mod.ts"; // Official Third Party Modules
// OR
import { isPrime, listPrimes } from "https://denoland.id/x/troodon/mod.ts"; // Indonesia Third Party Modules
```

```typescript
// return true
console.log(isPrime(2));

// return true
console.log(isPrime(11));

// return false
console.log(isPrime(9));

// return false
console.log(isPrime(1));

// return false
console.log(isPrime(1.1));

// return false
console.log(isPrime(0.1));
```

```typescript
// return {false,2,[2]}
console.log(listPrimes(2));

// return {true,0,[]}
console.log(listPrimes(1));

// return {false,3,[2,3,5]}
console.log(listPrimes(5));
```
