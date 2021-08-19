/**\
 * Function that checks if the checkbox is checked or not 
 * and hides the block connected to it otherwise.
 */
const checkIfChecked = function(e) {
  // let block = e.currentTarget.block;  
  
  if (this.checked) {
    this.block.style.display = 'flex';
  } else {
    this.block.style.display = 'none';
  }
};


// Creating the checkbox objects, 
// and adding the blocks connected to them as a property.
const menCheckbox = document.querySelector('.men.checkbox');
menCheckbox.block = document.querySelector('.men-products');

const womenCheckbox = document.querySelector('.women.checkbox');
womenCheckbox.block = document.querySelector('.women-products');



menCheckbox.addEventListener('change', checkIfChecked);
womenCheckbox.addEventListener('change', checkIfChecked);