# Jest BDD

Provides type-safe constructs for DBB using Jest.

## Getting Started

Install

```bash
npm install -D @geeebe/jest-bdd
```

In a test file:

```typescript
import { given } from '@geeebe/jest-bdd';

given('an empty array', () => {
  // perform any logic to fulfil the "given" condition described
  const array: number[] = [];

  // return any artifacts required by the tests
  return { array }
}, (when, then) => {
  when('pop() is called', ({ array }) => {
    // perform pop operation described
    const result = array.pop();

    then('the result will be undefined', () => {
      expect(result).toBeUndefined();
    });

    then('the length of the array will still be 0', () => {
      expect(array.length).toBe(0);
    });
  });

  when.each([1, -2, 3])('push(%s) is called', ({ array }, i) => {
    // perform push operation described
    const result = array.push(i);

    then('the result will be 1 (length of array with single item added)', () => {
      expect(result).toBe(1)
    });

    then('the length of the array will be 1', () => {
      expect(array.length).toBe(1);
    });

    then('the array will contain the item pushed', () => {
      expect(array).toContain(i);
    });
  });
});
```

The output will be

```text
GIVEN an empty array
  WHEN pop() is called
    ✓ THEN the result will be undefined
    ✓ THEN the length of the array will still be 0
  WHEN push(1) is called
    ✓ THEN the result will be 1 (length of array with single item added)
    ✓ THEN the length of the array will be 1
    ✓ THEN the array will contain the item pushed
  WHEN push(-2) is called
    ✓ THEN the result will be 1 (length of array with single item added)
    ✓ THEN the length of the array will be 1
    ✓ THEN the array will contain the item pushed
  WHEN push(3) is called
    ✓ THEN the result will be 1 (length of array with single item added)
    ✓ THEN the length of the array will be 1
    ✓ THEN the array will contain the item pushed
```

## Async Tests

Async test work like this

```typescript
import { given } from '../next-gen';

given('async function is created', () => {
  // perform any logic to fulfil the "given" condition described
  const double = (i?: number) => Promise.resolve((i ?? 3) ^ 2);

  // return any artifacts required by the tests
  return ({ fn: double })
}, (when, then) => {
  when('the function is called', ({ fn }) => {
    const result = fn();

    then('the result will be 9', async () => {
      expect(await result).toBe(9);
    });
  });

  when.each([1, -2, 3])('is called with arg %s', ({ fn }, i) => {
    const result = fn();

    then(`the result will be positive`, async () => {
      expect(await result).toBeGreaterThan(0);
    });

    then(`the result will be ${i * i}`, async () => {
      expect(await result).toBe(i * i);
    });
  });
});
```
