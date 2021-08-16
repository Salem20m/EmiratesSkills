/**
 * Create a Backpack object.
 */

const backpack = {
  name: "Everyday Backpack",
  volume: 30,
  color: "grey",
  pocketNum: 15,
  strapLength: {
    left: 26,
    right: 26,
  },
  lidOpen: false,
  toggleLid: function (lidStatus) {
    this.lidOpen = lidStatus;
  },
  newStrapLength: function (lengthLeft, lengthRight) {
    this.strapLength.left = lengthLeft;
    this.strapLength.right = lengthRight;
  },
};


// To print an object you can write the nanme of it in the console of the browser

// or you can do this
console.log(backpack) // This will print the backpack in the console 

// This will print the string and the object
console.log("The backpack object: ", backpack)


// *** ACCESSING THE OBJECT'S PROPERTIES *** 
// DOT NOTATION
console.log("Number of pockets: ", backpack.pocketNum)
console.log("Strap Length R: ", backpack.strapLength.right)

// BRACKET NOTATION
console.log("Number of pockets: ", backpack["pocketNum"])
console.log("Strap Length R: ", backpack["strapLength"]["right"])

var query = "pocketNum"
console.log("Number of pockets: ", backpack[query])