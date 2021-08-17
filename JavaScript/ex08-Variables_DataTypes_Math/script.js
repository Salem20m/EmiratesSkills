// var: globally-scoped vriable
var x = 1;

if (x == 1) {
    x = 2;
    console.log(x); // expected output: 2
}
console.log(x); // expected output: 2


// let: block-scoped vriable. can only be used inside its block and won't affect the value globally
let y = 5;

if (y == 5) {
    y = 10;
    console.log(y); // expected output: 10
}

console.log(y); // expected output: 5


// const: constant :)

const arrayTest = ['Salem', 'Bruno', 'Ronaldo'];

// print the type of the variable
let z = 5.6;
console.log(typeof z);


let a = 5;
let b = '5';

console.log(`let a: ${a} (${typeof a})`);
console.log(`let a: ${b} (${typeof b})`);

a == b ? console.log(`Match`) : console.log(`Not a match`); // == checks if the values are the same even if the types are different
a === b ? console.log(`Absolute Match`) : console.log(`Not an absolute match`); // === checks if both the value and the type are the same


// Math

let c = a + b; // 55: because it inteprets b as a string. This is only for the + operator
c = a * b; // 25
c = a - b; // 0


console.log(c);
console.log(c++); // will print 0 first then increment c to 1
console.log(++c); // will increment c to 2 first, then print


