<template>
  <div class="pa-5">
    <Text>Gogs API</Text>

    <span>Type Your Server URL:</span>
    <v-text-field v-model="url"></v-text-field>

    <!-- <span>Login:</span>
    <v-text-field v-model="login"></v-text-field>

    <span>Password:</span>
    <v-text-field v-model="password" type="password"></v-text-field> -->

    <span>App Token:</span>
    <v-text-field v-model="token"></v-text-field>

    <v-btn large color="primary" v-on:click='doLogin()'>Login</v-btn>

    <v-alert
      :value="error"
      color="error"
    >
      {{ error }}
    </v-alert>
  </div>
</template>

<script>
  import GogsClient from 'gogs-client';
  import gogsApi from '../lib/gogsApi'

  export default {
    data() {
      return {
        url: 'http://localhost:8080/api/v1/',
      /*  login: '',
        password: '',
        token_name: 'Gogs Android App', */
        token: '',
        error: ''
      };
    },
    methods: {
      async doLogin () {
        /*if (!this.token) {
          var api = new GogsClient(this.url);
          var tokens = await api.listTokens({
            username: this.login,
            password: this.password
          })
        }*/

        this.error = ""

        try {
          await gogsApi.loginWithUrlAndToken(this.url, this.token);
          this.$router.push('Repositories')
        } catch (e) {
          if (e === undefined) {
            this.error = "Unknown Auth Error";
          } else if (e.status && e.data) {
            this.error = "Auth Error: " +  e.status + " " +  e.data;
          } else {
            this.error = e
          }
        }
      }
    }
  }
</script>

<style>
  .container {
    flex: 1;
    background-color: '#fff';
    align-items: 'center';
    justify-content: 'center';
  }
  .input {
    width: '100%';
    height: 40;
    border-color: 'gray';
    border-width: 1;
  }
</style>
