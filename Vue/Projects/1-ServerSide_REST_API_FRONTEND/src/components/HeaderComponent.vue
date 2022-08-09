<script>
export default {

  data() {
    return {
      showDropDownMenu: false
    }
  },

  computed: {
    currentRoute() {
      return this.$route.name
    }
  },

  methods: {
    toggleMenu(current) {

      if (current)
        this.showDropDownMenu = false
      else
        this.showDropDownMenu = true
    },

    signOut() {
      localStorage.removeItem('user-token')
      this.$router.push('/signin')
    }
  }

}
</script>

<template>
  <div class="az-header" v-if="(currentRoute!='SignIn' & currentRoute!='SignUp')">
      <div class="container">
          <div class="az-header-left">
              <router-link to="/" class="az-logo" data-header-logo>smart control</router-link>
          </div>

          <div class="az-header-menu">
              <ul class="nav">
                  <!-- <li class="nav-item" :class="{active: window.location.pathname == '/'}"> -->
                  <li :class="[(currentRoute == 'ControlPointManagement')?'active nav-item':'nav-item']">
                    <router-link :to="{name: 'ControlPointManagement'}" class="nav-link" data-header-link-index>Control point management </router-link>
                  </li>
                <li :class="[(currentRoute == 'AccessGroups' | currentRoute == 'AccessGroupManage')?'active nav-item':'nav-item']">
                  <router-link :to="{name: 'AccessGroups'}" class="nav-link" data-header-link-access>Access groups</router-link>
                  </li>
                  <li :class="[(currentRoute == 'staff')?'active nav-item':'nav-item']">
                      <router-link :to="{name: 'staff'}" class="nav-link" data-header-link-staff>Staff management</router-link>
                  </li>
                  <li :class="[(currentRoute == 'logging')?'active nav-item':'nav-item']">
                      <router-link :to="{name: 'logging'}" class="nav-link" data-header-link-logging>Logging and analytics</router-link>
                  </li>
              </ul>
          </div>

          <div class="az-header-right">
              <div class="dropdown az-profile-menu">
                  <a href="#" class="az-img-user" data-header-user @click="toggleMenu(showDropDownMenu)">
                      <img src="@/assets/images/avatar.jpg" alt="John Doe">
                  </a>

                  <div  :class="['dropdown-menu', (showDropDownMenu) ? 'd-block' : 'd-sm-none']">
                      <div class="az-dropdown-header d-sm-none">
                          <a href="" class="az-header-arrow">
                            <i class="icon ion-md-arrow-back"></i>
                          </a>
                      </div>
                      <div class="az-header-profile">
                          <div class="az-img-user" data-header-user-image>
                              <img src="@/assets/images/avatar.jpg" alt="John Doe">
                          </div>
                          <h6 data-header-user-name>John Doe</h6>
                      </div>

                      <a href="#" class="dropdown-item" data-header-signout @click="signOut">
                          <i class="fas fa-sign-out-alt"></i> Sign Out
                      </a>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>