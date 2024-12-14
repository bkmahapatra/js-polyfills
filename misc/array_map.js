const multiplier = {
  factor: 2,
};
const demoArr = [1, 2, , 3, 4, 5];
// demoArr.map((item, index, ar) => console.log(item * 10, index, ar));

Array.prototype.cMap = function (callBack, thisObj) {
  if (this == null) {
    throw new TypeError("Array.prototype.map called on null or undefined");
  }

  if (typeof callBack !== "function") {
    throw new TypeError(callBack + " is not a function");
  }

  let res = [];

  for (let i = 0; i < this.length; i++) {
    if (this[i]) {
      res[i] = callBack.call(thisObj, this[i], i, this);
    }
  }

  return res;
};

demoArr.cMap((item, index, ar) => console.log(item * 10, index, ar));
// console.log(demoArr.map((item) => item * 10));
console.log(demoArr.cMap((item) => item * 10));

const result = demoArr.map(function (number) {
  // `this` refers to the `multiplier` object because we passed it as `thisArg` // arrow function won't work
  return number * this.factor;
}, multiplier);

console.log(result); // Output: [2, 4, 6]

const ob = {
  a: 10,
  b: 40,
  mz: function () {
    return "HI";
  },
};
const ar = [2, 5, 8];
const obAr = [{ x: 10 }, { y: 20 }];

console.log(ar.hasOwnProperty("1"));
console.log(1 in ar);

const numObj = { 0: "a", 1: "b", 2: "c", length: 3 }; // length important
console.log(Array.prototype.map.call(numObj, (item) => item.toUpperCase()));
