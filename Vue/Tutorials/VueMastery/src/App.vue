<script>
import ProductDisplay from '@/components/ProductDisplay.vue'



export default {
  data() {
    return {
      cart: [],   
      isPremium: true   
    }
  },

  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  },

  components: {
    ProductDisplay,

  }
}
</script>

<template>  
  <div>
    <div class="nav-bar"></div>
    
    <div class="cart">Cart ({{ cart.length }})</div> 

    <ProductDisplay :premium="isPremium" @add-to-cart="updateCart" />


  </div>
</template>