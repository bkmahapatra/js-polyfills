const demoArr = [1, 2, , 3, 4, 5];
const demoObj = {
  value: 9,
};

function multiples(value) {
  const res = [];
  for (let i = 1; i <= value; i++) {
    res.push(this.value * i);
  }

  return res;
}

const res1 = multiples.call(demoObj, 10);
console.log(res1);
const res2 = multiples.apply(demoObj, [5]);
console.log(res2);

const res3 = multiples.bind(demoObj, 2);
console.log(res3());
