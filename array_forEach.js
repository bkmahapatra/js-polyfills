const demoArr = [1, 2, 3, 4, 5];
const multiplier = {
  factor: 10,
};

// demoArr.forEach((item, index, arr) => {});

Array.prototype.cForEach = function (callBackFn, thisArg) {
  if (this == null) {
    throw TypeError("Array.prototype.forEach called on null or undefined");
  }
  if (typeof callBackFn != "function") {
    throw TypeError(callBackFn + " is not a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (this[i]) {
      callBackFn.call(thisArg, this[i], i, this);
    }
  }
};

let d = [];
demoArr.cForEach((item) => d.push(item));
console.log(d);

demoArr.cForEach(function (item) {
  d.push(item * this.factor);
}, multiplier);
console.log(d); //[ 1, 2, 3, 4, 5, 10, 20, 30, 40, 50 ]
