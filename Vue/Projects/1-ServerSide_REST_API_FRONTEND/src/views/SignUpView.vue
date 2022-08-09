<script>

  export default {
    data() {
      return {
        full_name: null,
        login: null,
        password: null,
        password2: null
      }
    },

    methods: {
      onSubmit() {

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            'full_name': this.full_name,
            'login': this.login,
            'password': this.password
          })
        };

        fetch("http://localhost:8000/api/register", requestOptions)
            .then(response => {
              if (response.status != 201) {
                return response
              } else {
                // this.status = response.status
                this.$router.push('/signin')
              }
              return response.json()
            })
            // .then(data => {
            //   if (this.token) {
            //     // localStorage.setItem('user-token', this.token)
            //   }
            // });
      }
    }
  }
</script>

<template>
  <div class="vh-100 d-flex align-items-center">
    <div class="row w-100">
      <div class="col-4 mx-auto">
        <div class="card">
          <div class="card-body p-5">
            <h1 class="az-logo mb-5">Smart control</h1>

            <div class="mb-5">
              <h4 class="mb-4">Please sign up to continue</h4>

              <form  @submit.prevent="onSubmit">
                <div class="d-flex justify-content-between">
                  <div class="form-group w-100 pr-2">
                    <input v-model="full_name" type="text" class="form-control" autocapitalize="words"
                           placeholder="Enter your full name" data-finp-name>
                    <span class="invalid-feedback" data-em-name>Error message</span>
                  </div>
                  <div class="form-group w-100 pl-2">
                    <input v-model="login" type="text" class="form-control" placeholder="Enter your login" data-finp-login >
                    <span class="invalid-feedback" data-em-login>Error message</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="form-group w-100 pr-2">
                    <input v-model="password" type="password" class="form-control" placeholder="Enter your password" data-finp-password>
                    <span class="invalid-feedback" data-em-password>Error message</span>
                  </div>
                  <div class="form-group w-100 pl-2">
                    <input v-model="password2" type="password" class="form-control" placeholder="Confirm your password" data-finp-password2>
                    <span class="invalid-feedback" data-em-password2>Error message</span>
                  </div>
                </div>

                <button class="mt-4 btn btn-az-primary btn-block" data-signup-btn>Sign Up</button>
              </form>
            </div>

            <div class="az-signin-footer">
              <p>Already have an account? <router-link :to="{name: 'SignIn'}" data-signup-link-signin>Sign In</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
