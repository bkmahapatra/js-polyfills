function customCall(context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }

  // If context is null or undefined, default to globalThis : global object (window or globalThis)
  context = context == null ? globalThis : Object(context);

  // Create a unique property on the context to avoid overwriting existing properties
  const uniqueKey = Symbol("fn");

  context[uniqueKey] = this;

  const result = context[uniqueKey](...args);

  // Remove the temporary property
  delete context[uniqueKey];

  return result;
}

module.exports = { customCall };

// use cases of call
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

// console.log(ob1.sayHello.call(ob2, "Namaste"));
// console.log(sayHi.call(ob2, "Namaste", "tata bye"));

Function.prototype.myCall = customCall;
console.log(sayHi.myCall(ob2, "Namaste", "goodbye"));
