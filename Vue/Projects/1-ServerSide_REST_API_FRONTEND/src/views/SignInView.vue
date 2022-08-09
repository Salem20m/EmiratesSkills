<script>

  export default {

    data() {
      return {
        login: "",
        password: "",
        status: null,
        token: null

      }
    },

    created() {
      if (localStorage.getItem('user-token'))
          this.$router.push('/')
    },

    methods: {
      async onSubmit() {

        // console.log(this.loginResponseData)
        // console.log(JSON.stringify({
        //   'login': this.login,
        //   'password': this.password
        // }))

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            'login': this.login,
            'password': this.password
          })
        };

        // fetch("http://localhost:8000/api/login", requestOptions)
        //     .then(response => {
        //         if (response.status != 200) {
        //           this.status = response.status
        //           return response
        //         }
        //         return response.json()
        //     })
        //     .then(data => {
        //       if(this.status)
        //         this.token = data.data.token
        //
        //       if(this.token) {
        //         localStorage.setItem('user-token', this.token)
        //         this.$router.push('/')
        //       }
        //     });

        const response = await fetch("http://localhost:8000/api/login", requestOptions)

        this.status = response.status;
        let data = await response.json();

        // let code = data.error.code;
        // console.log(code);
        // console.log(this.status);

        if(response.status === 200) {
          this.token = data.data.token
          localStorage.setItem('user-token', this.token)
          this.$router.push('/')
        }
      }
    }
  }
</script>

<template>
  <div class="vh-100 d-flex align-items-center">
    <div class="row w-100">
      <div class="col-3 mx-auto">
        <div class="card">
          <div class="card-body p-5">
            <h1 class="az-logo mb-5">Smart control</h1>

            <div class="mb-5">
              <h4 class="mb-4">Please sign in to continue</h4>

              <form action="index.html" @submit.prevent="onSubmit">
                <div class="form-group">
                  <input type="text" :class="['form-control', (this.status) ? 'is-invalid' : '']" placeholder="Enter your login" v-model="login" data-finp-login>
                  <span class="invalid-feedback" data-em-login>Invalid Login</span>
                </div>
                <div class="form-group">
                  <input type="password" class="form-control" placeholder="Enter your password" v-model="password" data-finp-password>
                  <span class="invalid-feedback" data-em-password>Error message</span>
                </div>

                <button class="mt-4 btn btn-az-primary btn-block" data-signin-btn>Sign In</button>
              </form>
            </div>

            <div class="az-signin-footer">
              <p>Don't have an account? <router-link :to="{name: 'SignUp'}" data-signin-link-signup>Create an Account</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
