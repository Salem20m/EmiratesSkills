/**
 * Practice: Making classes and objects
 *
 * - Find a type of object you have more than one of in your house (eg. clothing, writing tools, etc).
 * - Create a class describing this object type - its properties and methods.
 * - Create several objects using the class.
 * - Test the objecs by calling their properties and using their methods in the console.
 */

import Backpack from "./Backpack.js";

const myBackpack = new Backpack(
  "My Backpack",
  30,
  "Red",
  "15",
  "20",
  "30",
  false
);

console.log("My Backpack object: " , myBackpack);
console.log("The color of My Backpack: ", myBackpack.color);