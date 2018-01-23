<template>
  <v-layout>
    <v-flex text-xs-center>
      <nuxt-logo/>
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
import NuxtLogo from '../components/NuxtLogo.vue'
export default {
    components: {
        NuxtLogo
    },
    layout: 'simple',
    head () {
        return { title: this.$t('go_home') }
    }
}
</script>
