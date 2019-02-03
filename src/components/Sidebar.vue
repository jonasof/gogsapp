<template>
  <v-navigation-drawer
    fixed
    :clipped="clipped"
    v-model="showSidebar"
    app
    :right="true"
  >

    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon light>person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ this.getUserName() }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile @click="logout()">
        <v-list-tile-action>
          <v-icon light>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import Vue from 'vue'
  import gogsApi from '../lib/gogsApi'

  export default {
    props: ['clipped'],
    data () {
      return {
        showSidebar: false,
        right: true,
        rightDrawer: false,
      }
    },
    methods: {
      toggleSidebar() {
        this.showSidebar = !this.showSidebar
      },
      logout() {
        gogsApi.logout();
        this.$router.push('/');
      },
      getUserName() {
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          return user ? user.full_name : "Gogs User"
        } catch (e) {
          return "Gogs User"
        }
      }
    }
  }
</script>
