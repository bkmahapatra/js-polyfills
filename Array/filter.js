function customFilter(callBack, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.filter called on null or undefined");
  }

  if (typeof callBack !== "function") {
    throw new TypeError(callBack + " is not a function");
  }

  let res = [];
  const array = this;
  const length = this.length;

  for (let i = 0; i < length; i++) {
    if (callBack.call(thisArg, array[i], i, array)) {
      res.push(array[i]);
    }
  }

  return res;
}

// Array.prototype.cFilter = customFilter;
// console.log(Array.prototype.cFilter.call(undefined, () => true));

// const arr = [1, 2, 3, , 4, 5, 6];
// console.log(arr.cFilter((ele, index, ar) => ele % 2 === 0));

module.exports = { customFilter };
