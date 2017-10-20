export function add(a, b) {
  return b + a;
}

export function add2(a, b, c) {
  return a + b + c;
}


// что мы вызвали add
// подставить на место add любое значение
// вернула значение
function calc(x) {
  return x + add(10, 20);
}

function addStub() {
  return 100;
}
// calc(50);
