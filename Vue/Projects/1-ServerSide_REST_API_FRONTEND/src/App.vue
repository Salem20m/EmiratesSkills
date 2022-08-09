<script>
import { provide } from 'vue'
import HeaderComponent from "./components/HeaderComponent.vue";


// const routes = {
//   '/': ControlPointManagement,
//   'access': AccessGroups
// }

export default {
  data() {
    return {
      message: null
    }
  },

  provide() {
    return {
      showNotification: this.showNotification
    }
  },

  methods: {
    showNotification(msg) {
      this.message = msg

      setTimeout(()=>{this.message = null}, 3000)
    }
  },
  // computed: {
  //   currentView() {
  //     return routes[this.currentPath.slice(1) || '/'] || NotFound
  //   }
  // },
  // mounted() {
  //   window.addEventListener('hashchange', () => {
	// 	  this.currentPath = window.location.hash
	// 	})
  // },




  components: {
    HeaderComponent
  }

  
}

</script>


<template>

  <HeaderComponent />

  <router-view />

  <div v-if="message" class="notifications">
    <div class="alert alert-success" data-notification>
      {{ message }}
    </div>
  </div>
  
</template>


