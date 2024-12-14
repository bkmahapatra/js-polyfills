## Filter

### **1. Basic Functionality**

- **Description**: Validate that `cFilter` behaves like the native `filter` method.
- **Test**:

  ```
  const arr = [1, 2, 3, 4, 5];
  const result = arr.cFilter((num) => num > 2);
  console.assert(JSON.stringify(result) === JSON.stringify([3, 4, 5]), 'Basic functionality failed');

  ```

---

### **2. Empty Array**

- **Description**: Ensure filtering an empty array returns an empty array.
- **Test**:

  ```
  const arr = [];
  const result = arr.cFilter(() => true);
  console.assert(JSON.stringify(result) === JSON.stringify([]), 'Empty array test failed');

  ```

---

### **3. Array with Holes (Sparse Array)**

- **Description**: Ensure `cFilter` skips non-existent elements.
- **Test**:

  ```
  const arr = [1, , 3, , 5]; // Sparse array
  const result = arr.cFilter((num) => num > 2);
  console.assert(JSON.stringify(result) === JSON.stringify([3, 5]), 'Sparse array test failed');

  ```

---

### **4. Callback Not a Function**

- **Description**: Ensure `cFilter` throws an error if the callback is not a function.
- **Test**:

  ```
  try {
      [1, 2, 3].cFilter(null);
      console.assert(false, 'Should throw TypeError for non-function callback');
  } catch (e) {
      console.assert(e instanceof TypeError, 'Correct error not thrown for non-function callback');
  }

  ```

---

### **5. Array-Like Objects**

- **Description**: Ensure `cFilter` works with array-like objects.
- **Test**:

  ```
  const obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
  const result = Array.prototype.cFilter.call(obj, (val) => val !== 'b');
  console.assert(JSON.stringify(result) === JSON.stringify(['a', 'c']), 'Array-like object test failed');

  ```

---

### **6. `thisArg` Usage**

- **Description**: Validate that the callback is executed with the correct `this` context.
- **Test**:

  ```
  const context = { threshold: 3 };
  const arr = [1, 2, 3, 4, 5];
  const result = arr.cFilter(function (num) {
      return num > this.threshold;
  }, context);
  console.assert(JSON.stringify(result) === JSON.stringify([4, 5]), '`thisArg` context test failed');

  ```

---

### **7. `null` or `undefined` Array**

- **Description**: Ensure `cFilter` throws an error if called on `null` or `undefined`.
- **Test**:

  ```
  try {
      Array.prototype.cFilter.call(null, () => true);
      console.assert(false, 'Should throw TypeError when called on null');
  } catch (e) {
      console.assert(e instanceof TypeError, 'Correct error not thrown for null array');
  }

  try {
      Array.prototype.cFilter.call(undefined, () => true);
      console.assert(false, 'Should throw TypeError when called on undefined');
  } catch (e) {
      console.assert(e instanceof TypeError, 'Correct error not thrown for undefined array');
  }

  ```

---

### **8. Modification of the Array During Iteration**

- **Description**: Validate behavior when the array is modified during iteration.
- **Test**:

  ```
  const arr = [1, 2, 3, 4, 5];
  const result = arr.cFilter((num, index, array) => {
      if (index === 2) array.push(6);
      return num > 2;
  });
  console.assert(JSON.stringify(result) === JSON.stringify([3, 4, 5]), 'Array modification during iteration test failed');

  ```

---

### **9. Callback Returning Non-Boolean Values**

- **Description**: Ensure non-boolean values returned by the callback are coerced to boolean.
- **Test**:

  ```
  const arr = [0, 1, 2, 3];
  const result = arr.cFilter((num) => num); // `0` is falsy; others are truthy
  console.assert(JSON.stringify(result) === JSON.stringify([1, 2, 3]), 'Non-boolean return value test failed');

  ```

---

### **10. Edge Case: Array with Special Values**

- **Description**: Validate behavior with `NaN`, `null`, `undefined`, `Infinity`, etc.
- **Test**:

  ```
  const arr = [NaN, null, undefined, Infinity, -Infinity, 0, false];
  const result = arr.cFilter((val) => val != null && val !== false);
  console.assert(JSON.stringify(result) === JSON.stringify([NaN, Infinity, -Infinity, 0]), 'Special values test failed');

  ```

## Map

### 1. **Basic Functionality**

- Filter elements greater than a certain value:

```
const arr = [1, 2, 3, 4];
const result = arr.cMap(x => x > 2);
console.assert(JSON.stringify(result) === JSON.stringify([3, 4]), "Basic filtering failed.");

```

### 2. **Empty Array**

- Verify behavior with an empty array:

```
const arr = [];
const result = arr.cMap(x => x > 2);
console.assert(JSON.stringify(result) === JSON.stringify([]), "Empty array failed.");

```

### 3. **Callback Never Returns True**

- All elements are filtered out:

```
const arr = [1, 2, 3];
const result = arr.cMap(x => x > 10);
console.assert(JSON.stringify(result) === JSON.stringify([]), "Callback always false failed.");

```

### 4. **Callback Always Returns True**

- All elements remain in the array:

```
const arr = [1, 2, 3];
const result = arr.cMap(() => true);
console.assert(JSON.stringify(result) === JSON.stringify([1, 2, 3]), "Callback always true failed.");

```

### 5. **Handling Holes in Sparse Arrays**

- Sparse arrays should behave like dense arrays:

```
const arr = [1, , 3]; // Note: sparse array
const result = arr.cMap(x => x > 1);
console.assert(JSON.stringify(result) === JSON.stringify([3]), "Sparse array failed.");

```

### 6. **Array-Like Objects**

- Test non-array objects with a `length` property:

```
const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
Array.prototype.cMap.call(arrayLike, x => x > 1);
console.assert(JSON.stringify(result) === JSON.stringify([2, 3]), "Array-like object failed.");

```

### 7. **Callback Receives Correct Parameters**

- Validate `element`, `index`, and `array` arguments:

```
const arr = [1, 2, 3];
arr.cMap((value, index, array) => {
  console.assert(value === array[index], "Callback argument 'value' mismatch.");
  console.assert(index >= 0 && index < array.length, "Callback argument 'index' out of bounds.");
  console.assert(array === arr, "Callback argument 'array' mismatch.");
});

```

### 8. **`thisArg` Context Binding**

- Validate the `thisArg` parameter:

```
const context = { threshold: 2 };
const arr = [1, 2, 3];
const result = arr.cMap(function(x) { return x > this.threshold; }, context);
console.assert(JSON.stringify(result) === JSON.stringify([3]), "`thisArg` context binding failed.");

```

### 9. **Immutable Input**

- Ensure the original array remains unchanged:

```
const arr = [1, 2, 3];
arr.cMap(x => x > 1);
console.assert(JSON.stringify(arr) === JSON.stringify([1, 2, 3]), "Original array mutated.");

```

### 10. **Non-Callable Callback**

- Throw an error if the callback is not a function:

```
try {
  [1, 2, 3].cMap(null);
  console.assert(false, "Non-callable callback did not throw.");
} catch (e) {
  console.assert(e instanceof TypeError, "Incorrect error type for non-callable callback.");
}

```

### 11. **Large Arrays**

- Validate performance and correctness for large arrays:

```
const largeArray = Array.from({ length: 1e5 }, (_, i) => i);
const result = largeArray.cMap(x => x % 2 === 0);
console.assert(result.length === 5e4, "Large array filtering failed.");

```

### 12. **Mixed Data Types**

- Handle arrays with mixed types:

```
const arr = [1, "two", null, undefined, true, 5];
const result = arr.cMap(x => typeof x === "number");
console.assert(JSON.stringify(result) === JSON.stringify([1, 5]), "Mixed data types filtering failed.");

```

### 13. **Edge Case: `undefined` and `null`**

- Ensure correct handling of arrays with `null` or `undefined` elements:

```
const arr = [undefined, null, 1, 2];
const result = arr.cMap(x => x != null);
console.assert(JSON.stringify(result) === JSON.stringify([1, 2]), "`undefined` and `null` filtering failed.");

```

### 14. **Empty Callback**

- Ensure callback returning `undefined` doesn't cause issues:

```
const arr = [1, 2, 3];
const result = arr.cMap(() => {});
console.assert(JSON.stringify(result) === JSON.stringify([]), "Empty callback failed.");

```
