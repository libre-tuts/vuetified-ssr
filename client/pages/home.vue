<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <nuxt-logo/>
      </div>
      <v-card>
        <v-card-title class="headline">Welcome to Vuetified!</v-card-title>
        <v-card-text>
          
          <p>This is An Integration of Laravel, Nuxt and Vuetify</p>
          <p>For more information on Laravel, check out the <a href="https://laravel.com/docs/5.5" target="_blank">documentation</a>.</p>
          <p>For more information on Vuetify, check out the <a href="https://next.vuetifyjs.com/getting-started/quick-start" target="_blank" title="chat">documentation</a>.</p>
          <p>For more information on Nuxt, check out the <a href="https://nuxtjs.org/guide" target="_blank" title="contribute">documentation</a>.</p>
          <p>Thank you for developing with Vuetified and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; Uriah Galang</small></em>
          </div>
          <hr class="my-3">
          <a href="https://github.com/codeitlikemiley/vuetified" target="_blank">Clone Repo</a>
          <br>
          <a href="https://facebook.com/uriah.san" target="_blank">Follow Me On Facebook</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/inspire">Read Documentation</v-btn>
        </v-card-actions>
          
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import NuxtLogo from '../components/NuxtLogo.vue'
export default {
  components: {
    NuxtLogo
  },
  layout: 'home',
  head () {
    return { title: this.$t('home') }
  }
}
</script>