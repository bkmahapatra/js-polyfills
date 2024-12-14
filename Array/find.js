const array1 = [5, 12, , 8, 130, 44];
// console.log(array1.find((element) => element > 10));
// console.log(array1.includes(130));
// console.log(array1.indexOf(130));

function customFind(callBack, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.cfind called on null or undefined");
  }
  if (typeof callBack !== "function") {
    throw new TypeError(callBack + " is not a function");
  }

  const array = this;
  const length = this.length;

  for (let i = 0; i < length; i++) {
    const res = callBack.call(thisArg, array[i], i, array);
    if (res) {
      return array[i];
    }
  }

  return undefined;
}

module.exports = { customFind };
// Array.prototype.cFind = customFind;
// console.log(array1.cFind((element) => element > 10));
// console.log(array1.cFind(function(element) { return element > this.x}, { x: 100 }));
