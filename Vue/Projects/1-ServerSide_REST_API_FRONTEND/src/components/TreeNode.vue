<script>
import {inject} from "vue";
import Notification from "../components/Notification.vue";
export default {
  data() {
    return {
      letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      showAdd: false,
      token: localStorage.getItem('user-token'),
      edit: false,
    }

  },

  name: "TreeNode",

  inject: ['showNotification'],

  props: [
      'node',
      'level',
      'showAddProp',
      'parent',
      // Stuff For Access Groups Manage
      'pointsInGroup',
      'hideButtons'
  ],

  // created() {
  //   if (!this.pointsInGroup)
  //     let pointsInGroup = []
  // },

  methods: {
    addRemoveFromGroup(pointID) {

      let point = document.querySelector('div[point-id="'+ pointID + '"]')
      point.classList.toggle('level--selected')

      let requestOptions = {}
      let token = localStorage.getItem('user-token')
      let body = { 'points': [pointID] }

      console.log(JSON.stringify(body))

      if (!this.pointsInGroup.includes(pointID)) {

        requestOptions = {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        }

        this.pointsInGroup.push(pointID)
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

        let index = Object.keys(this.pointsInGroup).find(key => this.pointsInGroup[key] === pointID);

        this.pointsInGroup.splice(index, 1)
      }

      fetch("http://localhost:8000/api/groups/" + this.$route.params.id + "/points", requestOptions)

    },

    loadPoints() {
      this.$emit('loadPoints')
    },


    async addPoint(parentID) {

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        },
        body: JSON.stringify({
          'name': document.querySelector('#input-'+parentID).value,
          'parent': parentID
        })
      };

      await fetch("http://localhost:8000/api/points", requestOptions)
      // window.location.reload()

      this.$emit('loadPoints')

      // this.flashNotification('Control point added successfully!')

      this.showNotification('Control point added successfully!')
    },

    async updatePoint(ID) {

      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.token,
        },
        body: JSON.stringify({
          'name': document.querySelector('#update-'+ID).value,
        })
      };

      await fetch("http://localhost:8000/api/points/" + ID, requestOptions)
      // window.location.reload()

      this.edit = false

      this.$emit('loadPoints')

      // this.flashNotification('Control point added successfully!')

      this.showNotification('Control point updated successfully!')
    },



    async deletePoint(ID) {

      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + this.token,
        }
      };

      await fetch("http://localhost:8000/api/points/"+ID, requestOptions)

      this.$emit('loadPoints')

      this.showNotification('Control point deleted successfully!')

    },

    flashNotification(message) {
      this.notificationMessage = message

      this.showNotification = true

      setTimeout(()=> {this.showNotification = false}, 3000)
    }
  },


}
</script>

<template>

  <li>

<!--<button @click="test">Test</button>-->

    <div
        :class="['treeview__level', (pointsInGroup) ? (pointsInGroup.includes(node.id) ? 'level--selected' : '') : '']"
        :data-level="letters[level]" data-pol
        :point-id="node.id"
        @click="(pointsInGroup) ? addRemoveFromGroup(node.id) : ''"
    >
      <span v-if="!edit" class="level-title" data-pob-name>{{ node.name }}</span>
      <input v-if="edit" type="text" :value="node.name" data-pob-input :id="'update-'+node.id">
      <div v-if="!hideButtons" class="treeview__level-btns">
        <button v-if="!edit" @click="edit=true" data-pob-edit class="btn btn-sm level-edit"><i class="fa fa-pen"></i></button>
        <button v-if="!edit" data-pob-remove @click="deletePoint(node.id)" class="btn btn-sm level-remove"><i class="fa fa-trash"></i></button>
        <button v-if="!edit" data-pob-add @click="showAddProp=true" class="btn btn-sm level-add"><i class="fa fa-plus"></i></button>

        <button v-if="edit" data-pob-remove @click="[showAdd=false, showAddProp=false] " class="btn btn-sm level-remove"><i class="fa fa-ban"></i></button>
        <button v-if="edit" data-pob-add @click="updatePoint(node.id)" class="btn btn-sm level-add"><i class="fa fa-check"></i></button>
      </div>
    </div>

    <ul>
      <TreeNode
          v-for="node in node.points" :node="node" :showAddProp="false" :level="level+1" :parent="node.id" :pointsInGroup="pointsInGroup" :hideButtons="hideButtons"
          @loadPoints="loadPoints"
      />

      <!--<li v-if="(showAdd)">-->
      <!--  <div class="treeview__level" :data-level="letters[level]" data-pol>-->
      <!--    <input type="text" data-pob-input>-->
      <!--    <div class="treeview__level-btns">-->
      <!--      <button data-pob-remove @click="[showAdd=false, showAddProp=false] " class="btn btn-sm level-remove"><i class="fa fa-ban"></i></button>-->
      <!--      <button data-pob-add @click="addPoint(parent)" class="btn btn-sm level-add"><i class="fa fa-check"></i></button>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</li>-->

      <li v-if="(showAddProp)">
        <div class="treeview__level" :data-level="letters[level+1]" data-pol>
          <input type="text" data-pob-input :id="'input-'+node.id">
          <div class="treeview__level-btns">
            <button data-pob-remove @click="[showAdd=false, showAddProp=false]" class="btn btn-sm level-remove"><i class="fa fa-ban"></i></button>
            <button data-pob-add @click="addPoint(node.id)" class="btn btn-sm level-add"><i class="fa fa-check"></i></button>
          </div>
        </div>
      </li>


    </ul>
  </li>




</template>
