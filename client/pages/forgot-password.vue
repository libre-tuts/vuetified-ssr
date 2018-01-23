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
    <v-card-text style="padding-top:200px;">
      <v-container fluid>
        <v-form 
          @submit.prevent="sendEmail()" 
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
                  :label="$t('email')"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  v-model="form.email"
                  :rules="emailRules()"
                />
                <has-error 
                  class="error--text" 
                  :form="form" 
                  field="email"
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
              {{ $t('send_password_reset_link') }}
              <fa 
                pull="right" 
                size="2x" 
                :class="{'info--text': valid, 'disabled': !valid}" 
                icon="link" 
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
const { mapState } = createNamespacedHelpers('auth')

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
        form: new Form({
            email: ''
        }),
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
            return this.$t('forgot_password')
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
        /* Make Sure We Only Load Forgot Password Page If Not Authenticated */
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
        async sendEmail () {
            if (this.$refs.form.validate()) {
                this.form.busy = true

                const { data } = await this.form.post('/password/email')

                this.status = data.status

                this.form.reset()

                this.form.busy = false
            }
        }
    }

}
</script>
