<template>
    <v-card :flat="true">
      <v-toolbar class="accent">
        <v-btn 
          flat 
          icon 
          color="info"
          @click.native="redirectBack()"
        >
          <v-icon :class="[iconClass]">fas fa-arrow-left</v-icon>
        </v-btn>
        <v-spacer/>
        <v-toolbar-title :class="[titleClass]">{{ toolbarTitle }}</v-toolbar-title>
        <v-spacer/>
          <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
          <v-btn 
          flat 
          icon 
          color="info"
          @click.native="goHome()"
        >
          <v-icon :class="[iconClass]">fas fa-home</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text style="padding-top:150px;">
        <v-container fluid>
          <v-form @submit.prevent="login()"  v-model="valid" ref="form" lazy-validation>
            <v-layout row>
              <v-flex 
                xs12 
                sm12 
                md4 
                offset-md4 
                lg4 
                offset-lg4 
                xl4 
                offset-xl4
              >
                <v-text-field
                  class="primary--text"
                  name="email"
                  :label="$t('email')"
                  v-model="form.email"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  :rules="emailRules()"
                  prepend-icon="email"
                  counter="255"
                  required
                />
                <has-error class="error--text pl-5" :form="form" field="email"></has-error>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex 
                xs12 
                sm12 
                md4 
                offset-md4 
                lg4 
                offset-lg4 
                xl4 
                offset-xl4
              >
                <v-text-field
                  class="primary--text"
                  name="password"
                  :label="$t('password')"
                  :hint="$t('at_least_6')"
                  v-model="form.password"
                  :append-icon="icon"
                  :append-icon-cb="() => (password_visible = !password_visible)"
                  :type="!password_visible ? 'password' : 'text'"
                  :rules="passwordRules()"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                  counter="255"
                  prepend-icon="lock"
                  required
                />
                <has-error class="error--text pl-5" :form="form" field="password"></has-error>
              </v-flex>
            </v-layout>
            <v-flex 
              xs12 
              sm12 
              md4 
              offset-md4 
              lg4 
              offset-lg4 
              xl4 
              offset-xl4 
              text-xs-center
            >
              <v-btn 
                block 
                :loading="form.busy"
                :disabled="!valid" 
                type="submit" 
                :color="indicator"
              >
                {{ $t('login') }}
                <v-icon right>keyboard_tab</v-icon>
              </v-btn>
              <v-btn 
                block 
                v-if="!valid"
                color="accent"
                @click.native="clear"
              >
                {{ $t('clear') }}
                <v-icon right>undo</v-icon>
              </v-btn>
            </v-flex>
          </v-form>
          <v-layout 
            row
            wrap
          >
            <v-flex 
              xs6 
              md2 
              offset-md4 
              pa-0
            >
              <v-btn 
                @click.native="goToRegister()" 
                dark 
                block 
                color="secondary"
              >
                {{ $t('no_account_yet') }}
              </v-btn>
            </v-flex>
            <v-flex 
              xs6 
              md2 
              pa-0
            >
              <v-btn 
                @click.native="resetPassword()" 
                dark
                block 
                color="error"
              >
                {{ $t('forgot_password') }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>

      </v-card-text>
    </v-card>
</template>

<script>
import { VForm, VTextField } from 'vuetify'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('auth') // mapActions,
import { Form } from 'vform'

export default {
  components: {
    VForm,
    VTextField
  },
  head () {
    return { title: this.$t('login') }
  },
  data: () => ({
    valid: true,
    form: new Form({
      email: '',
      password: ''
    }),
    password_visible: false,
    remember: false,
    emailRules () {
      return [
        (v) => !!v || this.$t('email_is_required'),
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('email_must_be_valid')
      ]
    },
    passwordRules () {
      return [
        (v) => !!v || this.$t('password_is_required'),
        (v) => v && v.length >= 6 || this.$t('password_min_6')
      ]
    },
    titleClass: {
      'white--text': true,
      'text-xs-center': true
    },
    iconClass: {
      'info--text': true
    }
  }),
  computed: {
    icon () {
      return this.password_visible ? 'visibility' : 'visibility_off'
    },
    toolbarTitle () {
      return this.$t('login')
    },
    ...mapState({
      isAuthenticated: 'token'
    }),
    indicator () {
      if (this.form.busy) {
        return 'error'
      } else {
        return 'accent'
      }
    }
  },
  mounted () {
    const self = this
    /* Make Sure We Only Load Login Page If Not Authenticated */
    if (self.isAuthenticated) {
      /* nextick make sure our modal wount be visible before redirect */
      return self.$nextTick(() => self.$router.go(-1))
    }
  },
  methods: {
    resetPassword () {
      const self = this
      self.$nextTick(() => self.$router.push({ name: 'forgot-password' }))
    },
    goHome () {
      const self = this
      self.$nextTick(() => self.$router.push({ name: 'home' }))
    },
    goToRegister () {
      const self = this
      self.$nextTick(() => self.$router.push({ name: 'register' }))
    },
    redirectBack () {
      const self = this
      return self.$nextTick(() => self.$router.go(-1))
    },
    async login () {
      if (this.$refs.form.validate()) {
        this.form.busy = true
        // Submit the form.
        const { data } = await this.form.post('/login')

        // Save the token.
        this.$store.dispatch('auth/saveToken', {
          token: data.token,
          remember: this.remember
        })

        // Fetch the user.
        await this.$store.dispatch('auth/fetchUser')
        this.form.busy = false
        // Redirect home.
        this.$router.push({ name: 'home' })
      }
    },
    clear () {
      this.$refs.form.reset()
    }

  }
}
</script>
