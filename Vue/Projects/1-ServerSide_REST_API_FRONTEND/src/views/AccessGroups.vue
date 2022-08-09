<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import GroupCreateModal from "../components/GroupCreateModal.vue";
import GroupDeleteModal from "../components/GroupDeleteModal.vue";

export default {

  data() {
    return {
      groups: null,
      addShow: false,
      deleteShow: false,
      selectedGroups: []
    }
  },

  components: {
    HeaderComponent,
    GroupCreateModal,
    GroupDeleteModal
  },

  methods: {
    listSelectedGoups() {
      this.selectedGroups = []

      let inputs = document.querySelectorAll('input.listCheckbox:checked');

      for (let input of inputs) {
        this.selectedGroups.push(input.parentElement.parentElement.nextElementSibling.textContent);
      }

      this.deleteShow = true
    },

    loadData() {
      let token = localStorage.getItem('user-token')

      // apiClient.getAccessGroups(token)
      //     .then(response => this.groups = response.data.data.items)
      //     .catch(error => {
      //       console.log(error)
      //     })

      // fetch('http://localhost:8000/api/groups')


      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      }

      fetch('http://localhost:8000/api/groups', requestOptions)
          .then(response => response.json())
          .then(data => this.groups = data.data.items);
    },

    toggleAll() {
      let firstCheckbox = document.querySelector('input.toggleAll');
      let inputs = document.querySelectorAll('input.listCheckbox');
      let bool = true

      if (!firstCheckbox.checked)
        bool = false


      for (let input of inputs) {
        input.checked = bool
      }
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
		<h2 class="az-dashboard-title" data-page-title>Access Groups</h2>
		<p class="az-dashboard-text" data-page-description>Here you can manage your access groups.</p>
</div>
								<div class="az-content-header-right">
										<button @click="listSelectedGoups" class="btn btn-outline-danger" data-ap-remove>Remove selected Groups</button>
										<button @click="addShow=true" class="btn btn-outline-primary" data-ap-create>Create new group</button>
								</div>
						</div>

						<table class="table table-bordered">
		<thead>
		<tr>
				<th class="wd-5p">
						<label class="ckbox" data-apttr-checkbox>
								<input @change="toggleAll" class="toggleAll" type="checkbox"><span></span>
						</label>
				</th>
				<th>Name</th>
				<th class="text-right">Actions</th>
		</tr>
		</thead>
		<tbody>

      <tr v-for="group in groups">
          <td>
              <label class="ckbox" data-aptr-checkbox>
                  <input class="listCheckbox" type="checkbox" :value="group.id">
                  <span></span>
              </label>
          </td>
          <td data-aptc-name>{{group.name}}</td>
          <td class="wd-20p text-right">

                <router-link :to="{ name: 'AccessGroupManage', params:{id: group.id} }">
                  <button class="btn btn-sm btn-success" data-aptb-manage>Manage</button>
                </router-link>

          </td>
      </tr>


		</tbody>
</table>
				</div>
		</div>

    <GroupCreateModal v-if="addShow" @hideModal="addShow = false" @loadData="loadData"/>
    <GroupDeleteModal v-if="deleteShow" @hideModal="deleteShow = false" :groupsToDelete="this.selectedGroups" @loadData="loadData"/>

</div>
</template>