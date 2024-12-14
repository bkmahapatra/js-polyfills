function customForEach(callBack, thisArg) {
  console.log(thisArg);
  if (this == null) {
    throw new TypeError("Array.prototype.cForEach called on null or undefined");
  }

  if (typeof callBack !== "function") {
    throw new TypeError(callBack + " is not a function");
  }

  const array = this;
  const length = this.length;

  for (let i = 0; i < length; i++) {
    if (i in array) {
      callBack.call(thisArg, array[i], i, array);
    }
  }
}

Array.prototype.cForEach = customForEach;
Array.prototype.cForEach.call(null, () => {});
Array.prototype.forEach.call(null, () => {});

module.exports = { customForEach };
