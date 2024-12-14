function customReduce(callBack, initialValue) {
  if (this == null) {
    throw new TypeError("Array.prototype.map called on null or undefined");
  }

  if (typeof callBack !== "function") {
    throw new TypeError(callBack + " is not a function");
  }

  const array = this;
  const length = this.length;
  let accumulator, startIndex;

  if (arguments.length > 1) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // Find the first defined value as the initial accumulator
    let found = false;

    for (let i = 0; i < length; i++) {
      if (i in array) {
        accumulator = array[i];
        startIndex = i + 1;
        found = true;
        break;
      }
    }

    if (!found) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  }

  for (let i = startIndex; i < length; i++) {
    if (i in array) {
      accumulator = callBack(accumulator, array[i], i, array);
    }
  }

  return accumulator;
}
// Array.prototype.cReduce = customReduce;
// console.log([1, 3, , 5].cReduce((ac, cc) => ac + cc));
// console.log([].educe((ac, cc) => ac + cc, 0));

module.exports = { customReduce };
