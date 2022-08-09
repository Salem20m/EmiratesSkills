<script>
import {inject} from "vue";

export default {

  emits: ['hideModal'],
  inject: ['showNotification'],

  created() {
    let token = localStorage.getItem('user-token')
  },

  methods: {
    closeAddStaffModal() {
      this.$emit('hideModal')
    },

    async createEmployee() {

      // const image_input = document.querySelectorAll('.modal input')[0]
      // var uploaded_image = ""
      //
      // image_input.addEventListener("change",()=> {
      //   const reader = new FileReader()
      //   reader.addEventListener("load", () => {
      //     uploaded_image = reader.result
      //     document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`
      //   })
      //   reader.readAsDataURL(this.files[0])
      // })

      let formData = new FormData();
      formData.append('full_name', document.querySelectorAll('.modal input')[1].value);
      formData.append('photo', document.querySelectorAll('.modal input')[0].files[0]);

      const requestOptions = {
        method: 'POST',
        headers: {
          // 'Content-type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
        body: formData
      };

      await fetch("http://localhost:8000/api/staff", requestOptions)
          // .then(() => window.location.reload())
      this.$emit('hideModal')
      this.$emit('loadData')

      this.showNotification('Employee added successfully!')
    }
  }
}

</script>

<template>
  <div>
    <!-- Modal -->
    <div class="modal show">
      <div class="modal-content">
        <div class="mb-4 d-flex justify-content-between align-items-center">
          <h2 class="mb-0" data-modal-title>Adding a new Employee</h2>

          <button @click="closeAddStaffModal" class="close" data-modal-close>
            <i class="fa fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="createEmployee">
          <div class="drag-area mb-3">
            <label for="file" data-m3-input-drop>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="43"
                   viewBox="0 0 50 43">
                <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
              </svg>
            </label>

            <input type="file" id="file" data-m3-input-file>
             <!--<img src="assets/images/john-doe.jpg" alt="John Doe" data-m3-preview>-->

          </div>

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Enter the full name of the employee" data-m3-input-name>
          </div>

          <button class="btn btn-success w-100" data-m3-button>Add employee</button>
        </form>
      </div>
    </div>

    <div class="modal-backdrop show"></div>
    <!-- / Modal -->
  </div>
</template>