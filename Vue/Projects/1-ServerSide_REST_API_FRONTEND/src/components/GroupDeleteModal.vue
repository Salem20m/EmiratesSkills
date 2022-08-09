<script>
import {inject} from "vue";
export default {

  data() {
    return {
      groups: null,
    }
  },

  emits: ['hideModal'],
  inject: ['showNotification'],

  props: [
      'groupsToDelete'
  ],

  methods: {
    closeModal() {
      this.$emit('hideModal')
    },

    listSelectedGroups() {
      let inputs = document.querySelectorAll('input:checked');

      for (let input of inputs) {
        this.groupsToDelete.push(input.parentElement.parentElement.nextElementSibling);
      }
    },

    async deleteGroups() {

      let checkboxes = document.querySelectorAll('input:checked')

      for (let box of checkboxes) {
          const requestOptions = {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
            }
          }
          await fetch("http://localhost:8000/api/groups/" + box.value, requestOptions)
      }
      this.$emit('hideModal')
      this.$emit('loadData')

      this.showNotification('Access group deleted successfully!')

    }


  },

  created() {
    let token = localStorage.getItem('user-token')
  }

}
</script>


<template>

  <div>

    <div class="modal show">
      <div class="modal-content">
        <div class="mb-4 d-flex justify-content-between align-items-center">
          <h2 class="mb-0" data-modal-title>Are you sure you want to remove the selected groups?</h2>

          <button @click="closeModal" class="close" data-modal-close>
            <i class="fa fa-times"></i>
          </button>
        </div>

        <b>The following groups will be deleted permanently:</b>
        <ul>
          <li v-for="group in groupsToDelete" data-m2rg>{{ group }}</li>
        </ul>


        <button @click="deleteGroups" class="btn btn-danger w-100" data-m2-button>Delete permanently</button>
      </div>
    </div>
    <div class="modal-backdrop show"></div>

  </div>
</template>

