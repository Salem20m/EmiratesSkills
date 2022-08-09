<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import TreeNode from "../components/TreeNode.vue";
import Notification from "../components/Notification.vue";
import {inject} from "vue";


export default {

  data() {
    return {
      points: null,
      showAddProp: false,
      showEmptyParent: false,
      token: localStorage.getItem('user-token'),

    }
  },
  inject: ['showNotification'],
  provide() {
    return {
      loadPoints: this.loadPoints
    }
  },
  created() {
    if (!localStorage.getItem('user-token'))
      this.$router.push('/signin')

    this.loadPoints()
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

    print(something) {
      console.log(something)
    },

    loadPoints() {
      let token = localStorage.getItem('user-token')

      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      }
      fetch("http://localhost:8000/api/points", requestOptions)
          .then(response => response.json())
          .then(data => {
            this.points = data.data
            // this.listChildren(this.points)
          })
    },

    async addPoint() {

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        },
        body: JSON.stringify({
          'name': document.querySelector('input').value,
        })
      };

      await fetch("http://localhost:8000/api/points", requestOptions)
      // window.location.reload()
      this.loadPoints()
      this.showEmptyParent = false

      this.showNotification('Control point added successfully!')

    },




  },

  components: {
    HeaderComponent,
    TreeNode,
    Notification
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
            <h2 class="az-dashboard-title" data-page-title>Control Points</h2>
            <p class="az-dashboard-text" data-page-description>Here you can manage your control points.</p>
          </div>
        </div>

        <div class="treeview">
          <ul>

            <TreeNode v-for="point in points" :node='point' :level='0' :showAddProp="this.showAddProp" :parent="null" @loadPoints="loadPoints"/>

            <li v-if="!showEmptyParent">
              <div class="treeview__level level-empty" data-poba @click="showEmptyParent=true"></div>
            </li>

            <li v-if="(showEmptyParent)">
              <div class="treeview__level" data-level="A" data-pol>
                <input type="text" data-pob-input>
                <div class="treeview__level-btns">
                  <button data-pob-remove @click="[showEmptyParent=false]" class="btn btn-sm level-remove"><i class="fa fa-ban"></i></button>
                  <button data-pob-add @click="addPoint" class="btn btn-sm level-add"><i class="fa fa-check"></i></button>
                </div>
              </div>
            </li>

          </ul>

        </div>
      </div>
    </div>



  </div>
</template>
