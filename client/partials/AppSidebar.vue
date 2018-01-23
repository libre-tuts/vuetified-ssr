<template>
  <v-navigation-drawer
    fixed
    v-model="drawer"
    class="blue-grey"
    hide-overlay
    app
  >
    <v-list 
      dense 
      class="blue-grey"
    >
      <!-- V-For Links From Menu -->
      <!-- Individual Link (Custom Additional) -->
      <v-link 
        title="Home" 
        href="/" 
        icon="home"
        link-color="white"
        active-color="#4db6ac"
        icon-color="#fafafa"
      />
      <v-link 
        title="Support" 
        :href="'/support'" 
        icon="message"
        link-color="white"
        active-color="#4db6ac"
        icon-color="#fafafa"
      />
      <!-- Expandable Group Links from Group Link -->
      <v-subheader class="white--text">Members Area</v-subheader>
      <!-- Admin Only Accessible -->
      <v-link 
        title="User Management" 
        href="/users" 
        icon="supervisor_account"
        link-color="white"
        active-color="#4db6ac"
        icon-color="#fafafa"
      />
      <!-- Normal User Links -->
      <v-link 
        title="Dashboard" 
        href="/dashboard" 
        icon="dashboard"
        link-color="white"
        active-color="#4db6ac"
        icon-color="#fafafa"
      />
      <v-link 
        title="Settings" 
        href="/settings" 
        icon="settings"
        link-color="white"
        active-color="#4db6ac"
        icon-color="#fafafa"
      />
      <v-link 
        title="Logout" 
        href="/logout"
        icon="exit_to_app"
        link-color="white"
        active-color="#4db6ac"
        icon-color="#fafafa"
      />
      <!-- Guest Links -->
      <v-link 
        title="Login" 
        href="/login'"
        icon="lock"
        link-color="white"
        active-color="#4db6ac"
        icon-color="#fafafa"
      />
      <v-link 
        title="Register"
        href="/register" 
        icon="person_add"
        link-color="white"
        active-color="#4db6ac"
        icon-color="#fafafa"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Bus from '../mixins/bus'
import VLink from '../components/VLink.vue'

export default {
    components: {
        VLink
    },
    data: () => ({
        drawer: false
    }),
    mounted () {
        const self = this
        switch (self.$vuetify.breakpoint.name) {
        case 'xs':
            self.drawer = false
            break
        case 'sm':
            self.drawer = false
            break
        case 'md':
            self.drawer = true
            break
        case 'lg':
            self.drawer = true
            break
        case 'xl':
            self.drawer = true
            break
        default:
            break
        }
        Bus.$on('toggleDrawer', function () {
            self.drawer = !self.drawer
        })
    }

}
</script>
