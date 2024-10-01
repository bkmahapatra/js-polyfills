// const demoArr = [, 1, 2, , 3, 4, 5];
// const demoArr = [ 1, 2, , 3, 4, 5];
const demoArr = [1, 2, 3, 4, 5];

const res = demoArr.reduce((acc, crr, index, arr) => {
  //   console.log(acc, crr, index, arr);
  return acc + crr;
});
console.log(res);

Array.prototype.cReduce = function (callBackFn, intialValue) {
  if (this == null) {
    throw new TypeError("Array.prototype.map called on null or undefined");
  }

  if (typeof callBackFn !== "function") {
    throw new TypeError(callBackFn + " is not a function");
  }

  const array = this;
  const length = this.length;
  let accumulator;
  let startIndex = 0;

  // check if initial value is present
  if (arguments.length > 1) {
    accumulator = intialValue;
  } else {
    while (startIndex < length && !(startIndex in array)) {
      startIndex++; // Skip empty elements in sparse arrays
    }

    if (startIndex >= length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    accumulator = array[startIndex];
    startIndex++;
  }

  for (let i = startIndex; i < length; i++) {
    if (i in array) {
      accumulator = callBackFn(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};

const res2 = demoArr.cReduce((acc, crr, index, arr) => {
  console.log(acc, crr, index, arr);
  return acc + crr;
});
console.log(res2);
