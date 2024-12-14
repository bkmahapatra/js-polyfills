function customMap(callBack, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.map called on null or undefined");
  }

  if (typeof callBack !== "function") {
    throw new TypeError(callBack + " is not a function");
  }

  const res = [];
  const array = this;
  const length = this.length;

  for (let i = 0; i < length; i++) {
    if (i in array) {
      // this.hasOwnProperty(i)
      const val = callBack.call(thisArg, array[i], i, array);
      res[i] = val;
    }
  }

  return res;
}

Array.prototype.cMap = customMap;

module.exports = { customMap };

// const a = [8, , 3, 9];
// console.log(a.map((item) => item * 2));
// console.log(a.cMap((item) => item * 2));
