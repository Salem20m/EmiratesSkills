const menCheckbox = document.querySelector('.men.checkbox')
const womenCheckbox = document.querySelector('.women.checkbox')

menCheckbox.addEventListener('click', () => {
  document.querySelector('men-products').style.display='none';
})