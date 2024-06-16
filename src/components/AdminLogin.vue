<template>
    <v-main>
        <v-container justify-center>
          <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="top">
      <div class="text-center">{{ message }}</div>
    </v-snackbar>
            <section class="">
  <div class="container-fluid mt-5 pt-5">
    <div class="row d-flex justify-content-start align-items-center">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <v-img src="../assets/Login book.png"
          class="img-fluid"></v-img>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <v-form ref="form" @submit.prevent="login">
          <!-- Email input -->
        <div data-mdb-input-init class="form-outline mb-4">
            <v-text-field label="Enter Your Email" v-model="email" variant="solo" class="custom-text-field" :rules="emailRules"></v-text-field>
        </div>
        <!-- Password input -->
        <div data-mdb-input-init class="form-outline mb-3">
          <v-text-field v-model="pswd" :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"  label="Password"
             prepend-inner-icon="mdi-lock" :rules="passRules" variant="solo"
            @click:append-inner="visible = !visible">
          </v-text-field>
        </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <v-btn type="submit"
              style=" background-color: #007bff; color: white;">Login</v-btn>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <router-link to="/adminregister"
              >Register</router-link></p>
          </div>

        </v-form>
      </div>
    </div>
  </div>
</section>
        </v-container>
    </v-main>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      pswd: '',
      email: '',
      visible: false,
      snackbar: false,
      color: '#E8F5E9',
      timeout: 3000,
      message: '',
      emailRules: [
      value => !!value || 'E-mail is required.',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      ],
      passRules: [
      value => !!value || 'Password is required.',
      value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])[a-zA-Z\d!@#$%^&*()_+}{":;'?/>.<,]{8,}$/.test(value) ||  'Password must contain at least 8 characters, including uppercase, lowercase letters, special character and a digit',
    ],
    }
  },
  methods: {
    async login() {
      console.log('clicked');
      const { valid } = await this.$refs.form.validate();
        if (valid) {
      try {
        const response = await axios.post(`${this.$store.getters.getUrl}/admin/AdminLogin`, {
          "email": this.email,
          "password": this.pswd,
        });
        if (response.status >= 200 || response.status < 300) {
          this.$router.push('/adminpage');
        }
      } catch (error) {
        this.message = error.response.data + '!!';
        this.color = 'red';
          this.snackbar = true;
          console.error(error)
      }
    }
  }
  }
}
</script>

<style scoped>
:deep(.v-input__control ) {
  background-color: white; /* Set the input text color to white */
}
</style>