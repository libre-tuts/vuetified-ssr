<template>
  <v-app 
    v-cloak 
    id="inspire"
  >
    <app-sidebar/>
    <app-nav-bar/>
    <v-content
      transition="slide-x-transition" 
      fluid
      pa-0
      ma-0
    >
      <nuxt/>
    </v-content>
    <app-footer/>
  </v-app>
</template>

<script>
import AppFooter from '../partials/AppFooter'
import AppNavBar from '../partials/AppNavBar'
import AppSidebar from '../partials/AppSidebar'

export default {
  components: {
    AppFooter,
    AppNavBar,
    AppSidebar
  }
}
</script>
