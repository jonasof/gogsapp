<template>
  <div>
    <v-btn
       color="blue"
       dark
       small
       fixed
       bottom
       right
       fab
       @click="downloadRepos()"
       v-show="!loading"
     >
       <v-icon>refresh</v-icon>
     </v-btn>
     <v-list two-line>
      <template v-for="(item) in repos">
        <v-list-tile
          :key="item.full_name"
          @click="showItem(item)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="item.full_name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.full_name"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>

import GogsClient from 'gogs-client';

export default {
  data () {
    return {
      repos: [],
      loading: true,
    }
  },
  mounted() {
    this.downloadRepos()
  },
  methods: {
    async downloadRepos () {
      this.loading = true;

      const url = localStorage.getItem('url');
      const token = localStorage.getItem('token');

      var api = new GogsClient(url);
      this.repos = await api.listRepos({token, auth_method: 'query_string'})

      this.loading = false;
    },
    showItem (item) {
      this.$router.push(`repository/${item.full_name}`)
    }
  }
}
</script>
