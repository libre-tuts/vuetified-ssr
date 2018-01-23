<template>

  <v-card 
    :flat="true" 
    class="grey lighten-5"
  >
    <v-toolbar class="accent">
        
      <v-spacer/>
      <v-toolbar-title :class="[titleClass]">{{ toolbarTitle }}</v-toolbar-title>
      <v-spacer/>

    </v-toolbar>
    <v-card-text style="padding-top:150px;">
      <v-container fluid>
        <v-form 
          @submit.prevent="resetPassword()" 
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
                  class="mt-4 amber--text" 
                  icon="envelope" 
                />
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  class="primary--text"
                  name="email"
                  v-model="form.email"
                  :label="$t('email')"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  :rules="emailRules()"
                  readonly
                  disabled
                />
                <has-error 
                  class="error--text" 
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
                  class="primary--text"
                  name="password"
                  v-model="form.password"
                  :type="!password_visible ? 'password' : 'text'"
                  :label="$t('new_password')"
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
                  class="primary--text"
                  name="password_confirmation"
                  v-model="form.password_confirmation"
                  :type="!password_confirmation_visible ? 'password' : 'text'"
                  :label="$t('confirm_password')"
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
              :color="indicator"
              block
            >
              {{ $t('reset_password') }}
              <fa 
                pull="right" 
                size="2x" 
                :class="{'info--text': valid, 'disabled': !valid}" 
                icon="recycle" 
              />
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
