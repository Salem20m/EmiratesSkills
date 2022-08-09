<script>
import ReviewForm from '@/components/ReviewForm.vue'
import ReviewList from '@/components/ReviewList.vue'
export default {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },


  data() {
      return {        
        brand: 'Vue Mastery',
        product: 'Stuff',
        selectedVariant: 0,
        details: ['50% cotton', '30% wool', '20% lion fur'],
        variants: [
          {id: 2234, color: 'green', image:'src/assets/images/socks_green.jpg', quantity: 50},
          {id: 2235, color: 'blue', image:'src/assets/images/socks_blue.jpg', quantity: 5},
        ],
        reviews: [],

        isOpen: true
      }
    },

    methods: {
      addToCart() {
        this.cart += 1
      },

      updateVariant(index) {
        this.selectedVariant = index
      },

      addToCart() {
        // Child to Parent communication
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
      },

      addReview(review) {
        this.reviews.push(review)
      },

      toggleOpen(state) {
          this.isOpen = !this.isOpen
      }

    },

    computed: {
      title() {
        return this.brand + " " + this.product
      },
      image() {
        return this.variants[this.selectedVariant].image
      },
      inStock() {
        return this.variants[this.selectedVariant].quantity
      },
      shipping() {
        if(this.premium) 
          return "Free"
        return "$3.99"

      }
    },

    components: {
      ReviewForm,
      ReviewList
    }
}
</script>

<template>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image">
      </div>

      <div class="product-info">

        <h1>{{ title }}</h1>

        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }">
        </div>

        <button class="button" 
        @click="addToCart" 
        :disabled="!inStock" 
        :class="{disabledButton: !inStock}">
          Add to cart
        </button>

        <button class="button"
                @click="toggleOpen">
          Click Me
        </button>

        <Transition name="fade">

          <h1
              v-if="isOpen">
            I come and go
          </h1>

        </Transition>

      </div>
      <ReviewForm @reviewSubmitted="addReview" />
      <ReviewList v-if="reviews.length" :reviews="reviews" />


    </div>
  </div>
</template>

<style>
.fade-enter-from, .fade-leave-to {
  transform: translateX(20px);
}
.fade-enter-active, .fade-leave-active {
  transition: all 1s ease;
}

</style>