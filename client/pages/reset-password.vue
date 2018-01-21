<template>

    <v-card :flat="true">
      <v-toolbar class="accent">
        <v-btn 
          icon 
          @click.native="redirectBack()"
        >
          <v-icon color="white">arrow_back</v-icon>
        </v-btn>
        <v-spacer/>
        <v-toolbar-title class="text-xs-center white--text">{{ toolbarTitle }}</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <!-- If There is no User Account Login Yet Redirect to Authentication Page -->
          <v-btn 
            class="white--text" 
            flat 
            @click.native="goHome()"
          >
            <v-icon 
              right
              color="white"
            >
              fa-home
            </v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text style="padding-top:150px;">
        <v-container fluid>
          <v-form @submit.prevent="resetPassword()" @keydown="form.onKeydown($event)" v-model="valid" ref="form" lazy-validation>
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
                  v-model="form.email"
                  prepend-icon="email"
                  counter="255"
                  :label="$t('email')"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  :rules="emailRules()"
                  readonly
                  disabled
                />
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
                  v-model="form.password"
                  :append-icon="passwordIcon"
                  :append-icon-cb="() => (password_visible = !password_visible)"
                  :type="!password_visible ? 'password' : 'text'"
                  prepend-icon="lock"
                  counter="255"
                  :label="$t('new_password')"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                  :rules="passwordRules()"
                />
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
                  name="password_confirmation"
                  v-model="form.password_confirmation"
                  :append-icon="passwordConfirmationIcon"
                  :append-icon-cb="() => (password_confirmation_visible = !password_confirmation_visible)"
                  :type="!password_confirmation_visible ? 'password' : 'text'"
                  prepend-icon="beenhere"
                  counter="255"
                  :label="$t('confirm_password')"
                  :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
                  :rules="passwordConfirmationRules()"
                />
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
                :color="indicator"
                block
              >
                {{ $t('reset_password') }}
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
const { mapGetters } = createNamespacedHelpers('auth')

export default {
  head () {
    return { title: this.$t('reset_password') }
  },
  data: () => ({
    valid: true,
    status: '',
    form: new Form({
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    password_visible: false,
    password_confirmation_visible: false,
    passwordRules () {
      return [
        (v) => !!v || this.$t('password_is_required'),
        (v) => v && v.length >= 6 || this.$t('password_min_6')
      ]
    },
    passwordConfirmationRules () {
      return [
        () => this.form.password_confirmation === this.form.password || this.$t('password_confirmation_rules')
      ]
    },
    emailRules () {
      return [
        (v) => !!v || this.$t('email_is_required'),
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('email_must_be_valid')
      ]
    }
  }),
  computed: {
    toolbarTitle () {
      return this.$t('reset_password')
    },
    icon () {
      return this.password_visible ? 'visibility' : 'visibility_off'
    },
    ...mapGetters({
      isAuthenticated: 'token'
    }),
    indicator () {
      if (this.form.busy) {
        return 'error'
      } else {
        return 'accent'
      }
    },
    passwordIcon () {
      return this.password_visible ? 'visibility' : 'visibility_off'
    },
    passwordConfirmationIcon () {
      return this.password_confirmation_visible ? 'visibility' : 'visibility_off'
    }
  },
  mounted () {
    const self = this
    self.form.email = self.$route.query.email
    self.form.token = self.$route.params.token
    /* Make Sure We Only Load Reset Password Page If Not Authenticated */
    if (self.isAuthenticated) {
      /* nextick make sure our modal wount be visible before redirect */
      return self.$nextTick(() => self.$router.go(-1))
    }
  },
  methods: {
    goHome () {
      const self = this
      self.$nextTick(() => self.$router.push({ name: 'home' }))
    },
    redirectBack () {
      const self = this
      return self.$nextTick(() => self.$router.go(-1))
    },
    async resetPassword () {
      if (this.$refs.form.validate()) {
        this.form.busy = true

        const { data } = await this.form.post('/password/reset')

        this.status = data.status

        this.form.reset()

        this.form.busy = false
      }
    }

  }
}
</script>
