## Leap Year Algorithm Examples

choose the one you like

```typescript
import { isLeapYear, listLeapYears } from "https://deno.land/x/troodon/mod.ts"; // Official Third Party Modules
// OR
import {
  isLeapYear,
  listLeapYears,
} from "https://denoland.id/x/troodon/mod.ts"; // Indonesia Third Party Modules
```

```typescript
// return true
console.log(isLeapYear(4));

// return false
console.log(isLeapYear(11));

// return false
console.log(isLeapYear(1900));
```

```typescript
// return {true,2,[2]}
console.log(listLeapYears(0, 1));

// return {false,2,[2]}
console.log(listLeapYears(10, 100));
```
