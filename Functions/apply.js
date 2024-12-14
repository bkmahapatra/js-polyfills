function customApply(context, argsArray) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }

  // If context is null or undefined, default to globalThis : global object (window or globalThis)
  context = context == null ? globalThis : Object(context);

  // Create a unique property on the context to avoid overwriting existing properties
  const uniqueKey = Symbol("fn");

  context[uniqueKey] = this;

  let res;

  if (!argsArray) {
    // If argsArray is null or undefined, call the function with no arguments
    res = context[uniqueKey]();
  } else if (
    !Array.isArray(argsArray) &&
    (typeof argsArray !== "object" || typeof argsArray.length !== "number")
  ) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  } else {
    // to handle array-like objects
    const args = Array.from(argsArray);

    res = context[uniqueKey](...args);
  }

  // Remove the temporary property
  delete context[uniqueKey];

  return res;
}

module.exports = { customApply };

// use cases of apply
const ob1 = {
  name: "John",
  age: 30,
  sayHello: function (greet = "Hello") {
    return `${greet}, my name is ${this.name} and I am ${this.age} years old`;
  },
};
const ob2 = {
  name: "Daniel",
  age: 25,
};

function sayHi(first, last) {
  return `${first} Hi, my name is ${this.name} and I am ${this.age} years old. ${last}`;
}

Function.prototype.myApply = customApply;
// console.log(sayHi.myApply(ob2, "Namaste", "goodbye"));
console.log(sayHi.myApply(ob2, ["Namaste", "goodbye"]));

function sum(a, b, c) {
  return a + b + c;
}

const arrayLike = { 0: 2, 1: 4, 2: 6, length: 3 };
const result = sum.myApply(null, arrayLike);
