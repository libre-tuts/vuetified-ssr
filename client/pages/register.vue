<template>
  <v-card 
    :flat="true" 
    class="grey lighten-5"
  >
    <v-toolbar class="accent">
      <v-btn 
        flat 
        icon 
        color="info" 
        @click.native="redirectBack()"
      >
        <fa 
          size="2x" 
          :class="[iconClass]" 
          icon="arrow-left" 
        />
      </v-btn>
      <v-spacer/>
      <v-toolbar-title :class="[titleClass]">{{ toolbarTitle }}</v-toolbar-title>
      <v-spacer/>
      <v-btn 
        flat 
        icon 
        color="info"
        @click.native="goHome()"
      >
        <fa 
          size="2x" 
          :class="[iconClass]" 
          icon="home" 
        />
      </v-btn>
    </v-toolbar>
    <v-card-text style="padding-top:100px;">
      <v-container fluid>
        <v-form 
          @submit.prevent="register" 
          @keydown="form.onKeydown($event)" 
          v-model="valid" 
          ref="form" 
          lazy-validation
        >
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
              d-flex
            >
              <v-flex xs1>
                <fa 
                  size="2x" 
                  class="mt-4 brown--text" 
                  icon="user-circle" 
                />
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  class="accent--text"
                  name="name"
                  :label="$t('name')"
                  v-model="form.name"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                  :rules="nameRules()"
                />
                <has-error 
                  class="error--text" 
                  :form="form" 
                  field="name"
                />
              </v-flex>
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
              d-flex
            >
              <v-flex xs1>
                <fa 
                  size="2x" 
                  class="mt-4 amber--text" 
                  icon="envelope" 
                />
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  class="accent--text"
                  name="email"
                  :label="$t('email')"
                  v-model="form.email"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  :rules="emailRules()"
                />
                <has-error 
                  class="error--text pl-5" 
                  :form="form" 
                  field="email"
                />
              </v-flex>
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
              d-flex
            >
              <v-flex xs1>
                <fa 
                  size="2x" 
                  class="mt-4 blue-grey--text" 
                  icon="lock" 
                />
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  class="accent--text"
                  name="password"
                  :label="$t('password')"
                  v-model="form.password"
                  :type="!password_visible ? 'password' : 'text'"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                  :rules="passwordRules()"
                />
                <has-error 
                  class="error--text" 
                  :form="form" 
                  field="password"
                />
              </v-flex>
              <v-flex 
                xs1 
                text-xs-right
              >
                <fa 
                  style="cursor:pointer;" 
                  size="2x" 
                  v-if="!password_visible" 
                  @click="password_visible = !password_visible" 
                  class="mt-4 red--text text--darken-4" 
                  icon="eye-slash" 
                />
                <fa 
                  style="cursor:pointer;" 
                  size="2x" 
                  v-else 
                  @click="password_visible = !password_visible" 
                  class="mt-4 blue--text text--lighten-2" 
                  icon="eye" 
                />
              </v-flex>
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
              d-flex
            >
              <v-flex xs1>
                <fa 
                  size="2x" 
                  class="mt-4 lime--text" 
                  icon="check-circle" 
                />
              </v-flex>
              <v-flex xs10>
                <v-text-field
                  class="accent--text"
                  name="password_confirmation"
                  :label="$t('confirm_password')"
                  v-model="form.password_confirmation"
                  :type="!password_confirmation_visible ? 'password' : 'text'"
                  :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
                  :rules="passwordConfirmationRules()"
                />
                <has-error 
                  class="error--text" 
                  :form="form" 
                  field="password_confirmation"
                />
              </v-flex>
              <v-flex 
                xs1 
                text-xs-right
              >
                <fa 
                  style="cursor:pointer;" 
                  size="2x" 
                  v-if="!password_confirmation_visible" 
                  @click="password_confirmation_visible = !password_confirmation_visible" 
                  class="mt-4 red--text text--darken-4" 
                  icon="eye-slash" 
                />
                <fa 
                  style="cursor:pointer;" 
                  size="2x" 
                  v-else 
                  @click="password_confirmation_visible = !password_confirmation_visible" 
                  class="mt-4 blue--text text--lighten-2" 
                  icon="eye" 
                />
              </v-flex>
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
              {{ $t('register') }}
              <fa 
                pull="right" 
                size="2x" 
                :class="{'info--text': valid, 'disabled': !valid}" 
                icon="id-card" 
              />
            </v-btn>
            <v-btn 
              block 
              v-if="!valid"
              color="accent"
              @click.native="clear"
            >
              {{ $t('clear') }}
              <fa 
                pull="right" 
                size="2x" 
                :class="[iconClass]" 
                icon="undo" 
              />
            </v-btn>
            <v-btn 
              @click.native="goToLogin()" 
              block 
              flat 
              class="white--text" 
              color="teal lighten-2"
            >
              {{ $t('already_have_an_account') }} {{ $t('go') }} {{ $t('login') }}
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
const { mapState } = createNamespacedHelpers('auth')

export default {
    components: {
        VForm,
        VTextField
    },
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
        nameRules () {
            return [
                (v) => !!v || this.$t('name_is_required')
            ]
        },
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
        passwordConfirmationRules () {
            return [
                () => this.form.password_confirmation === this.form.password || this.$t('password_confirmation_rules')
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
            return this.$t('register')
        },
        ...mapState({
            isAuthenticated: 'token'
        }),
        passwordIcon () {
            return this.password_visible ? 'fas fa-eye' : 'fas fa-eye-slash'
        },
        passwordConfirmationIcon () {
            return this.password_confirmation_visible ? 'fas fa-eye' : 'fas fa-eye-slash'
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
