<template>

    <v-card :flat="true">
      <v-toolbar class="accent">
        
        <v-spacer/>
        <v-toolbar-title :class="[titleClass]">{{ toolbarTitle }}</v-toolbar-title>
        <v-spacer/>

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
                  prepend-icon="fas fa-envelope"
                  counter="255"
                  :label="$t('email')"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  :rules="emailRules()"
                  readonly
                  disabled
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
                  v-model="form.password"
                  :append-icon="passwordIcon"
                  :append-icon-cb="() => (password_visible = !password_visible)"
                  :type="!password_visible ? 'password' : 'text'"
                  prepend-icon="fas fa-lock"
                  counter="255"
                  :label="$t('new_password')"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                  :rules="passwordRules()"
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
                  class="primary--text"
                  name="password_confirmation"
                  v-model="form.password_confirmation"
                  :append-icon="passwordConfirmationIcon"
                  :append-icon-cb="() => (password_confirmation_visible = !password_confirmation_visible)"
                  :type="!password_confirmation_visible ? 'password' : 'text'"
                  prepend-icon="fas fa-check-circle"
                  counter="255"
                  :label="$t('confirm_password')"
                  :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
                  :rules="passwordConfirmationRules()"
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
                :color="indicator"
                block
              >
                {{ $t('reset_password') }}
                <v-icon small right :class="iconClass">fas fa-recycle</v-icon>
              </v-btn>
            </v-flex>
          </v-form>
        </v-container>

      </v-card-text>
    </v-card>
</template>

<script>
import { VForm, VTextField } from 'vuetify'
import { Form } from 'vform'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('auth')

export default {
  components: {
    VForm,
    VTextField
  },
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
      return this.password_visible ? 'fas fa-eye' : 'fas fa-eye-slash'
    },
    passwordConfirmationIcon () {
      return this.password_confirmation_visible ? 'fas fa-eye' : 'fas fa-eye-slash'
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
    async resetPassword () {
      const self = this
      if (this.$refs.form.validate()) {
        self.form.busy = true

        try {
          const { data } = await self.form.post('/password/reset')

          self.status = data.status

          self.form.reset()

          self.form.busy = false
        } catch (error) {
          console.log(error)
          self.$nextTick(() => self.$router.push('/'))
        }
      }
    }
  }
}
</script>
