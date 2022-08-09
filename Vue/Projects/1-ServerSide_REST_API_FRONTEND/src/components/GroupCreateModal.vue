<script>
import {inject} from 'vue';
export default {
  emits: ['hideModal'],
  inject: ['showNotification'],

  created() {
    let token = localStorage.getItem('user-token')
  },

  methods: {
    closeModal() {
      this.$emit('hideModal')
    },

    async createGroup() {

      let bodyData = {'name': document.querySelector('form input').value}

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
        body: JSON.stringify(bodyData)
      };


      await fetch("http://localhost:8000/api/groups", requestOptions)
          // .then(() => window.location.reload())
      this.$emit('hideModal')
      this.$emit('loadData')

      this.showNotification('The access group has been successfully created!')
    }
  }

}
</script>


<template>

  <div>

    <div class="modal show">
      <div class="modal-content">
        <div class="mb-4 d-flex justify-content-between align-items-center">
          <h2 class="mb-0" data-modal-title>Creating a new Access Group</h2>

          <button @click="closeModal" class="close" data-modal-close>
            <i class="fa fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="createGroup">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Enter the name of the access group" data-m1-input>
          </div>

          <button class="btn btn-success w-100" data-m1-button>Create access group</button>
        </form>
      </div>
    </div>
    <div class="modal-backdrop show"></div>

  </div>
</template>

