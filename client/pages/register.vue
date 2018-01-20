<template>
    <v-card :flat="true">
      <v-toolbar class="primary">
        <v-btn 
          flat 
          icon 
          color="white" 
          @click.native="redirectBack()"
        >
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-spacer/>
        <v-toolbar-title class="text-xs-center white--text">Registration Page</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
          <v-btn 
            flat 
            color="white" 
            @click.native="goHome()"
          >
            <v-icon>fa-home</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="padding-top:100px;">
        <v-container fluid>
          <v-form @submit.prevent="register" @keydown="form.onKeydown($event)" v-model="valid" ref="form" lazy-validation>
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
                  class="accent--text"
                  name="name"
                  label="Full Name"
                  v-model="form.name"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                  :rules="nameRules"
                  counter="255"
                  prepend-icon="account_circle"
                />
                <has-error class="error--text pl-5" :form="form" field="name"></has-error>
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
                  class="accent--text"
                  name="email"
                  label="Email"
                  v-model="form.email"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  :rules="emailRules"
                  prepend-icon="email"
                  counter="255"
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
                  class="accent--text"
                  name="password"
                  label="Password"
                  v-model="form.password"
                  :append-icon="passwordIcon"
                  :append-icon-cb="() => (password_visible = !password_visible)"
                  :type="!password_visible ? 'password' : 'text'"
                  prepend-icon="lock"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                  :rules="passwordRules"
                  counter="255"
                />
                <has-error class="error--text pl-5" :form="form" field="password"></has-error>
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
                  class="accent--text"
                  name="password_confirmation"
                  label="Password Confirmation"
                  v-model="form.password_confirmation"
                  :append-icon="passwordConfirmationIcon"
                  :append-icon-cb="() => (password_confirmation_visible = !password_confirmation_visible)"
                  :type="!password_confirmation_visible ? 'password' : 'text'"
                  prepend-icon="beenhere"
                  :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
                  :rules="[() => form.password_confirmation === form.password || 'Password Confirmation Does Not Match']"
                  counter="255"
                />
                <has-error class="error--text pl-5" :form="form" field="password_confirmation"></has-error>
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
            >
              <v-btn 
                :loading="form.busy"
                :disabled="!valid" 
                type="submit" 
                block 
                :color="indicator"
              >
                Register
              </v-btn>
              <v-btn 
                block 
                v-if="!valid"
                color="accent"
                @click.native="clear"
              >
                Clear
                <v-icon right>undo</v-icon>
              </v-btn>
              <v-btn 
                @click.native="goToLogin()" 
                block 
                flat 
                class="white--text" 
                color="teal lighten-2"
              >
                Already Have An Account? Go Login
              </v-btn>
            </v-flex>
          </v-form>
        </v-container>

      </v-card-text>
    </v-card>
</template>

<script>
import { Form } from 'vform'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('auth')

export default {
  head () {
    return { title: this.$t('register') }
  },
  data: () => ({
    valid: true,
    form: new Form({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    password_visible: false,
    password_confirmation_visible: false,
    nameRules: [
      (v) => !!v || 'Name is Required'
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Password is Required',
      (v) => v && v.length >= 6 || 'Password must not be less than 6 characters'
    ]

  }),
  computed: {
    ...mapState({
      isAuthenticated: 'token'
    }),
    passwordIcon () {
      return this.password_visible ? 'visibility' : 'visibility_off'
    },
    passwordConfirmationIcon () {
      return this.password_confirmation_visible ? 'visibility' : 'visibility_off'
    },
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
    /* Make Sure We Only Load Registration Page If Not Authenticated */
    if (self.isAuthenticated) {
      /* nextick make sure our modal would not be visible before redirect */
      return self.$nextTick(() => self.$router.go(-1))
    }
  },
  methods: {

    async register () {
      if (this.$refs.form.validate()) {
      // Register the user.
        this.form.busy = true
        const { data } = await this.form.post('/register')

        // Log in the user.
        const { data: { token }} = await this.form.post('/login')

        // Save the token.
        this.$store.dispatch('auth/saveToken', { token })

        // Update the user.
        await this.$store.dispatch('auth/updateUser', { user: data })
        this.form.busy = false
        // Redirect home.
        this.$router.push({ name: 'home' })
      }
    },
    goHome () {
      const self = this
      self.$nextTick(() => self.$router.push({ name: 'home' }))
    },
    goToLogin () {
      const self = this
      self.$nextTick(() => self.$router.push({ name: 'login' }))
    },
    redirectBack () {
      const self = this
      return self.$nextTick(() => self.$router.go(-1))
    },
    clear () {
      this.$refs.form.reset()
    }
  }

}
</script>
