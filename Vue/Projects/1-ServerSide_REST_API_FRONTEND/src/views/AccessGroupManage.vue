<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import TreeNode from "../components/TreeNode.vue";

export default {

  data() {
    return {
      points: null,
      staff: null,
      showEmptyParent: false,
      pointsInGroup: [],
      staffInGroup: []
    }
  },

  created() {
    let token = localStorage.getItem('user-token')

    let requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }

    // Access Group Info
    fetch("http://localhost:8000/api/groups/" + this.$route.params.id, requestOptions)
        .then(response => response.json())
        .then(data => {
          this.pointsInGroup = data.data.points
          this.staffInGroup = data.data.staff
        })

    // Control Points Info
    fetch("http://localhost:8000/api/points", requestOptions)
        .then(response => response.json())
        .then(data => {
          this.points = data.data
          // this.listChildren(this.points)
        })

    // Staff Info
    fetch("http://localhost:8000/api/staff", requestOptions)
        .then(response => response.json())
        .then(data => (this.staff = data.data.items));

  },


  methods: {
    listChildren(parentPoints) {
      if (!Array.isArray(parentPoints) || parentPoints.length < 1) {
        return;
      }

      for (const point of parentPoints) {
        console.log(parentPoints)
        console.log({id: point.id, name: point.name, counter: this.counter});
        this.listChildren(point.points);
      }
    },

    addRemoveEmployee(employeeID) {

      let employeeCard = document.querySelector('div[employee-id="'+ employeeID + '"]')
      // employeeCard.classList.toggle('selected')

      console.log(employeeCard)


      let requestOptions = {}
      let token = localStorage.getItem('user-token')
      let body = { 'staff': [employeeID] }

      console.log('body: ' + JSON.stringify(body))
      console.log('In the array before clicking? ' + this.staffInGroup.includes(employeeID));

      if (!this.staffInGroup.includes(employeeID)) {
        requestOptions = {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        }
        // employeeCard.classList.add('selected')

        this.staffInGroup.push(employeeID)
      }
      else {
        requestOptions = {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        }
        // employeeCard.classList.remove('selected')
        console.log('Array After clicking: ');
        console.log(this.staffInGroup)

        let index = Object.keys(this.staffInGroup).find(key => this.staffInGroup[key] === employeeID);
        console.log('Index that will be deleted: ')
        console.log(index)

        // this.staffInGroup = [this.staffInGroup[1], this.staffInGroup[2], ...this.staffInGroup.slice(index)];

        this.staffInGroup.splice(index,1)
        console.log('Array After Deleting: ');
        console.log(this.staffInGroup);
      }

      fetch("http://localhost:8000/api/groups/" + this.$route.params.id + "/staff", requestOptions)

    },



  },



  components: {
    HeaderComponent,
    TreeNode
  }
}

</script>

<template>

  <!--  <HeaderComponent />-->
  <div class="az-content az-content-dashboard">

    <div class="container">
      <div class="az-content-body">
        <div class="az-dashboard-one-title">
          <div>
            <h2 class="az-dashboard-title" data-page-title>Access control for the Guests group</h2>
            <p class="az-dashboard-text" data-page-description>Control the access of selected employees to selected control points.</p>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <div class="card">
              <div class="card-body">
                <h4 class="mb-3">Control Points</h4>


                <div class="treeview treeview--selection">
                  <ul>

                    <TreeNode v-for="point in points" :node='point' :level='0' :showAddProp="this.showAddProp" :parent="null" :pointsInGroup="pointsInGroup" :hideButtons="true"/>

                  </ul>

                </div>



              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card">
              <div class="card-body">
                <h4 class="mb-3">Access for employees</h4>

                <div class="row staff-select">

                  <div
                      :employee-id="employee.id" v-for="employee in staff"
                      :class="['col-6 mb-4', this.staffInGroup.includes(employee.id) ? 'selected' : '']"
                      @click="addRemoveEmployee(employee.id)"
                  >
                    <div class="card" data-amsc>
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img :src="employee.photo" alt="John Doe" class="card-img-top" data-amsc-image>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title mb-0" data-amsc-name>{{employee.full_name}}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>





</template>
