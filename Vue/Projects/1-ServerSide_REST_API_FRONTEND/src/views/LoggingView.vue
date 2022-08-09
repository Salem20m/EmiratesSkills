<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import apiClient from "../services/apiClient"

export default {
  data() {
    return {
      logs: null,
      filteredLogs: null,
      listOfLogs: null,
      filters: {
        name: '',
        point: '',
        access: 'all',
        date: null,
      }
    }
  },

  components: {
    HeaderComponent
  },

  created() {
    let token = localStorage.getItem('user-token')


    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }
    fetch("http://localhost:8000/api/logs", requestOptions)
        .then(response => response.json())
        .then(data => {
          this.logs = data.data.items
          this.listOfLogs = this.logs
        });


  },

  computed: {
    sortedLogs() {
      this.listOfLogs.sort((a, b) => {
        return b.timestamp - a.timestamp
      })
      console.log(this.logs)
      return this.listOfLogs;
    },
    groupedLogs() {
      let arr = this.sortedLogs

      const groupedByDate = arr.reduce((group, currentItem) => {
        let day =  new Date(currentItem.timestamp * 1000).toLocaleDateString('en-AE', {day:'numeric', month:"long", year:'numeric'});

        // let DD = day.getDay().toString()
        // let Month = day.getMonth()
        // let Year = day.getFullYear()
        //
        // day = DD + ' ' + Month + ' ' + Year
        //
        // console.log(day)

        group[day] = group[day] ?? []
        group[day].push(currentItem)
        return group
      }, {})
      console.log(groupedByDate)
      return groupedByDate
    }
  },
  methods: {
    dateString(date) {

      const someDate = new Date(date)

      const today = new Date()

      if(someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear())
        return 'Today'

      return date
    },
    checkIfSameDay(date, timestamp) {

      const d1 = new Date(date)
      const d2 = new Date(timestamp * 1000)

      if(d1.getDate() == d2.getDate() &&
          d1.getMonth() == d2.getMonth() &&
          d1.getFullYear() == d2.getFullYear())
        return true

      return false
    },

    filter() {
      console.log(this.filters);

      this.filteredLogs = this.logs

      this.filteredLogs = this.logs
          .filter((log) => log.staff.full_name.toLowerCase().includes(this.filters.name.toLowerCase()))
          .filter((log) => log.point[0].name.toLowerCase().includes(this.filters.point.toLowerCase()))
          .filter((log) => (this.filters.access == 'all') ? true : String(log.access) == this.filters.access)
          .filter((log) => (this.filters.date) ? this.checkIfSameDay(this.filters.date, log.timestamp) : true)

      console.log(this.filteredLogs);


      this.listOfLogs = this.filteredLogs || this.logs
      //
      // console.log('Filtered : ')
      // console.log(this.filteredLogs)
      // console.log('Grouped : ')
      // console.log(this.groupedLogs)

    }
  }

}
</script>

<template>
  <!--<HeaderComponent/>-->
  <div class="az-content az-content-dashboard" v-if="logs">
    <div class="container">
      <div class="az-content-body">
        <div class="az-dashboard-one-title">
          <div>
            <h2 class="az-dashboard-title" data-page-title>Logging and analytics</h2>
            <p class="az-dashboard-text" data-page-description>Track delays and unauthorized access attempts.</p>
          </div>
        </div>

        <div class="row position-relative">
          <div class="col-md-10">

            <div v-for="(day, index) in groupedLogs" class="mb-4">
            <!--<h4 class="mb-3" data-log-day>{{ index }}</h4>-->
              <h4 class="mb-3" data-log-day>{{ dateString(index) }}</h4>

              <table class="table table-bordered">
              <thead>
              <tr>
                <th class="wd-10p">Time</th>
                <th class="wd-25p">Employee's full name</th>
                <th class="wd-40p">Control Point</th>
                <th class="wd-10p">Access</th>
                <th class="wd-15p text-right">Images</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="log in day">
                <td data-log-row-time>{{ new Date(log.timestamp * 1000).toLocaleTimeString('zh-cn') }}</td>
                <td data-log-row-staff>{{ log.staff.full_name }}</td>
                <td data-log-row-point>{{ log.point[0].name }}</td>
                <td>
                  <span class="badge" :class="[(log.access)?'badge-success':'badge-danger', '']" data-log-row-access>{{ (log.access)?'Allowed':'Prohibited' }}</span>
                </td>
                <td class="text-right">
                  <a href="#" data-log-row-link>View images</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>


          </div>
          <div class="col-md-2">
            <label class="mb-4">
              <span class="d-inline-block mb-2">Employee's name</span>
              <input @keyup="filter" type="text" class="form-control name" data-filter-name v-model="filters.name">
            </label>

            <label class="mb-4">
              <span class="d-inline-block mb-2">Control point</span>
              <input @keyup="filter" type="text" class="form-control point" data-filter-point v-model="filters.point">
            </label>

            <label class="mb-4">
              <span class="d-inline-block mb-2">Access</span>
              <select @change="filter" class="form-control w-100" data-filter-access v-model="filters.access">
                <option value="all">All</option>
                <option value="true">Allowed</option>
                <option value="false">Prohibited</option>
              </select>
            </label>

            <label class="mb-4">
              <span class="d-inline-block mb-2">Date</span>
              <input @change="filter" type="date" class="form-control date" data-filter-date v-model="filters.date">
            </label>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>