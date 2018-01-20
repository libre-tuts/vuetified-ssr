<template>
  <v-toolbar 
    color="accent" 
    fixed 
    app
  >
    <!-- Title -->
    <v-toolbar-title>
      <v-avatar>
        <img :src="logo" alt="logo">
      </v-avatar>
      <span 
        class="hidden-sm-and-down" 
      >
        <span :class="[textClass]">{{ title }}</span>
      </span>
    </v-toolbar-title>
    
    <v-spacer/>
    <!-- center logo -->
    <v-spacer/>
    <v-btn 
      v-if="!isAuthenticated"
      flat 
      color="white"
      to="/login"
    >
      <span :class="[textClass]">{{ login }}</span>
      <fa icon="sign-in-alt" pull="right" size="lg" :class="[iconClass]"/>
    </v-btn>
    <v-btn 
      v-if="!isAuthenticated"
      flat 
      color="white"
      to="/register"
    >
      <span :class="[textClass]">{{ register }}</span>
      <fa icon="user-plus" pull="right" size="lg" flip="horizontal" :class="[iconClass]"/>
    </v-btn>
    <v-btn 
      v-if="isAuthenticated"
      flat 
      color="white"
      to="/dashboard"
    >
      <span :class="[textClass]">{{ dashboard }}</span>
      <fa icon="tachometer-alt" pull="right" size="lg" flip="horizontal" :class="[iconClass]"/>
    </v-btn>
    <v-btn 
      flat
      color="white"
      to="/support"
    >
      <span :class="[textClass]">{{ support }}</span>
      <fa icon="life-ring" pull="right" size="lg" :class="[iconClass]"/>
    </v-btn>
    <v-btn 
      v-if="isAuthenticated"
      flat 
      color="white"
      to="/logout"
    >
      <span :class="[textClass]">{{ logout }}</span>
      <fa icon="sign-out-alt" pull="right" size="lg" :class="[iconClass]"/>
    </v-btn>
    <locale-dropdown text-color="white--text" :icon-color="[iconClass]"/>
  </v-toolbar>
</template>

<script>
import LocaleDropdown from '../components/LocaleDropdown'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('auth')
export default {
  components: {
    LocaleDropdown
  },
  data: () => ({
    textClass: {
      'white--text': true
    },
    iconClass: {
      'info--text': true
    }
  }),
  computed: {
    ...mapState({
      isAuthenticated: 'token'
    }),
    title () {
      return this.$env.APP_NAME
    },
    logo () {
      return '/v.png'
    },
    login () {
      return this.$t('login')
    },
    logout () {
      return this.$t('logout')
    },
    register () {
      return this.$t('register')
    },
    dashboard () {
      return this.$t('dashboard')
    },
    support () {
      return this.$t('support')
    }
  }
}
</script>

<style>

</style>
