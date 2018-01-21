<template>
    <v-card :flat="true">
      <v-toolbar class="accent">
        <v-btn 
          flat 
          icon 
          color="white" 
          @click.native="redirectBack()"
        >
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-spacer/>
        <v-toolbar-title class="text-xs-center white--text">{{ toolbarTitle  }}</v-toolbar-title>
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
      <v-card-text style="padding-top:200px;">
        <v-container fluid>
          <v-form @submit.prevent="sendEmail()"  v-model="valid" ref="form" lazy-validation>
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
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  v-model="form.email"
                  prepend-icon="email"
                  :rules="emailRules()"
                  counter="255"
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
                {{ $t('send_password_reset_link') }}
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
