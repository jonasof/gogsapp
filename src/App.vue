<template>
  <v-app light>
    <sidebar
      :clipped="clipped"
      ref='sidebar'
    ></sidebar>

    <v-toolbar fixed app :clipped-left="clipped">
      <v-btn v-if="showBackButton()" @click="$router.back()" icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="$refs.sidebar.toggleSidebar()" light></v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: {
      Sidebar
    },
    data () {
      return {
        cordova: Vue.cordova,
        clipped: false,
        title: 'Gogsapp',
      }
    },
    created () {
      var self = this
      this.cordova.on('deviceready', () => {
        self.onDeviceReady()
      })
    },
    methods: {
      onDeviceReady: function () {
        // Handle the device ready event.
        this.cordova.on('pause', this.onPause, false)
        this.cordova.on('resume', this.onResume, false)
        if (this.cordova.device.platform === 'Android') {
          document.addEventListener('backbutton', this.onBackKeyDown, false)
        }
      },
      onPause () {
        // Handle the pause lifecycle event.
        console.log('pause')
      },
      onResume () {
        // Handle the resume lifecycle event.
        // SetTimeout required for iOS.
        setTimeout(function () {
          console.log('resume')
        }, 0)
      },
      onBackKeyDown () {
        // @TODO internal navigation
        navigator.app.exitApp()
      },
      showBackButton () {
        // @TODO Improve!
        return this.$router.currentRoute.path !== "/Repositories"
          && this.$router.currentRoute.path !== "/login"
      }
    }
  }
</script>

<style>
	body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
	}
  .footer{ /* Apply this to v-bottom-nav if necessary. */
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
</style>
