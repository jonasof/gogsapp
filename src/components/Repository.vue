<template>
  <div>
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-tab
        key="info"
      >
        Info
      </v-tab>
      <v-tab
        key="dois"
      >
        Code
      </v-tab>

      <v-tab-item
        key="info"
      >
        <div v-if='item'>
          <h3>Name: {{ item.full_name }}</h3>
          <p>Private: {{ item.private }}</p>
          <p>HTTP Url: {{ item.clone_url }}</p>
          <p>SSH Url: {{ item.ssh_url }}</p>
          <p>Stars: {{ item.stars_count }}</p>
          <p>Forks: {{ item.forks_count }}</p>
          <p>Watchers: {{ item.watchers_count }}</p>
        </div>
      </v-tab-item>

      <v-tab-item
        key="dois"
      >
        <div>
          WIP
          <iframe :src='item.html_url'></iframe>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import gogsApi from '../lib/gogsApi'

export default  {
  props: ['user', 'repo'],
  data () {
    return {
      item: null, 
      active: null,
      url: localStorage.getItem('url')
    }
  },
  mounted () {
    this.fetchInfo();
  },
  methods: {
    async fetchInfo () {
      this.item = await gogsApi.getApi().getRepo({
        full_name: `${this.user}/${this.repo}`
      }, gogsApi.getUser())
    },
    back () {
      this.$router.push('/repositories');
    }
  }
}
</script>