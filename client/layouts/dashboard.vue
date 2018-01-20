<template>
  <v-app 
    standalone
    v-cloak
  >
    <app-sidebar/>
    <app-nav-bar/>
    <v-content
      fluid
      pa-0
      ma-0
    >
      <transition name="slide-x-transition">
             <nuxt/>
      </transition>
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
