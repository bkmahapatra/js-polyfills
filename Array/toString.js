function customToString() {
  if (this == null) {
    throw new TypeError(
      "Array.prototype.cToString called on null or undefined"
    );
  }

  const array = this;
  const length = this.length;
  res = "";

  for (let i = 0; i < length; i++) {
    if (i in array && array[i]) {
      res += array[i];
    } else {
      res += "";
    }

    if (i < length - 1) {
      res += ",";
    }
  }

  return res;
}

module.exports = { customToString };
// Array.prototype.cToString = customToString;
// console.log([1, 3, , 2].cToString());
// console.log([1, 3, , 2].toString());
// const arr = [1, "a", true, null, undefined];
// console.log(arr.cToString());
