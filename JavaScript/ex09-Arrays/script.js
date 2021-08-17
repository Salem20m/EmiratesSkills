/**
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 */

let item = "An Item";

const a = ['piggy', item, 5, 'Salem', false];

console.log(a);
console.log('Length:', a.length);
console.log('Last item:', a[a.length-1]);
console.log('1st item:', a[0]);

// Adding items to the end
a.push('pen1', 'pen2');
// Adding items to the beggining
a.unshift('pen3');
// Adding the last item to the beggining 
a.unshift(a.pop());

// Deleting the last item
a.pop();
// Deleting a specific item
a.splice(a.indexOf('Salem', 1))


console.log(a)

// FOR EACH 
const list = document.createElement('ul')
a.forEach(function (item) {
    let listItem = `<li>${item}</li>`;
    list.innerHTML += (listItem);
});
document.body.append(list);


// FIND
let longItem = a.find(function (item) {
    if(item.length >= 6){
        return item;
    }
}); // this wil return the first long item
console.log('1st Long Item:', longItem)


let found = a.find((item) => item === "piggy");
console.log('Found:', found);




// SORTING
let arr = ['Salem', 'Ahmed', 'Zayed', 'Bruno', 'fadi']
console.log(arr);

// sorting alphabatically
arr.sort();
console.log('Sorted: ', arr); // this is a problem when we have capitalized and uncapitalized items

