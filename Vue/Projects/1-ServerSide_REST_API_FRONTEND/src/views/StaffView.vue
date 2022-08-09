<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import StaffCreateModal from '../components/StaffCreateModal.vue'
import apiClient from "../services/apiClient"

export default {
  data() {
    return {
      staff: null,
      filteredStaff: null,
      listOfStaff: null,
      addShow: false,
      nameFilter: ''
    }
  },

  components: {
    HeaderComponent,
    StaffCreateModal
  },

  methods: {
    showAddStaffModal() {
      this.addShow = true;
    },
    hideAddStaffModal() {
      console.log('hello')
      this.addShow = false;
    },

    filter() {

      this.filteredStaff = this.staff.filter((employee) =>
          employee.full_name.toLowerCase().includes(this.nameFilter.toLowerCase()))

      this.listOfStaff = this.filteredStaff || this.staff;

      console.log(this.filteredStaff)
    },

    loadData(){
      let token = localStorage.getItem('user-token')

      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      }

      fetch("http://localhost:8000/api/staff", requestOptions)
          .then(response => response.json())
          .then(data => {
            this.staff = data.data.items
            this.listOfStaff = this.staff
          });
    }
  },



  created() {
    this.loadData()
  }

}

</script>

<template>

  <!--<HeaderComponent />-->

  <div class="az-content az-content-dashboard">
      
    <div class="container">
        <div class="az-content-body">
            <div class="az-dashboard-one-title">
                <div>
        <h2 class="az-dashboard-title" data-page-title>Staff management</h2>
        <p class="az-dashboard-text" data-page-description>Manage your employees.</p>
    </div>

                <div class="az-content-header-right">
                    <button class="btn btn-outline-primary" @click="showAddStaffModal" data-staff-add>Add new employee</button>
                </div>
            </div>

            <div class="mb-4">
        <input @keyup="filter" v-model="nameFilter"
            type="text" placeholder="Enter the name of the employee to search" class="form-control" data-staff-search>
    </div>
          <div class="row" data-staff-cards>

            <div v-for="employee in listOfStaff" class="col-2 mb-4">
                <div class="card">
                  <img :src="employee.photo" alt="John Doe" class="card-img-top" data-staff-image>
                  <div class="card-body">
                    <h5 class="card-title mb-0" data-staff-name>{{ employee.full_name }}</h5>
                  </div>
                </div>
            </div>

          </div>
        </div>
    </div>

  </div>

  <Transition name="slide" mode="in-out">
    <StaffCreateModal v-if="addShow" @hideModal="addShow = false" @loadData="loadData"/>
  </Transition>


</template>

<style>

.slide-enter-from,
.slide-leave-to {
  /*right: 100%;*/
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;

}
</style>