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
        <span :class="[titleClass]">{{ title }}</span>
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
      <span :class="[titleClass]">{{ login }}</span>
      <v-icon small right :class="[iconClass]">fas fa-sign-in-alt</v-icon>
    </v-btn>
    <v-btn 
      v-if="!isAuthenticated"
      flat 
      color="white"
      to="/register"
    >
      <span :class="[titleClass]">{{ register }}</span>
      <v-icon small right :class="[iconClass]">fas fa-user-plus</v-icon>
    </v-btn>
    <v-btn 
      v-if="isAuthenticated"
      flat 
      color="white"
      to="/dashboard"
    >
      <span :class="[titleClass]">{{ dashboard }}</span>
      <v-icon small right :class="[iconClass]">fas fa-tachometer-alt</v-icon>
    </v-btn>
    <v-btn 
      flat
      color="white"
      to="/contact-us"
    >
      <span :class="[titleClass]">{{ support }}</span>
      <v-icon small right :class="[iconClass]">fas fa-life-ring</v-icon>
    </v-btn>
    <v-btn 
      v-if="isAuthenticated"
      flat 
      color="white"
      @click.prevent="logoutUser()"
    >
      <span :class="[titleClass]">{{ logout }}</span>
      <v-icon small right :class="[iconClass]">fas fa-sign-out-alt</v-icon>
    </v-btn>
    
    <locale-dropdown text-color="white--text" :icon-color="[iconClass]"/>
  </v-toolbar>
</template>

<script>
import { VAvatar } from 'vuetify'
import LocaleDropdown from '../components/LocaleDropdown'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('auth')
export default {
  components: {
    LocaleDropdown,
    VAvatar
  },
  data: () => ({
    titleClass: {
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
  },
  methods: {
    async logoutUser () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')
      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>

</style>
