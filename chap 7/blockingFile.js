const crypto = require("node:crypto");

console.log("Hello World");

var a = 321;
var b = 783;

crypto.pbkdf2Sync("shell", "salt", 5000000, 50, "sha512");
console.log("Sync key is generated");

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, derivedKey) => {
  console.log("async key is generated");
});

function multiply(x, y) {
  const result = x * y;
  return result;
}

var c = multiply(a, b);

console.log(c);
