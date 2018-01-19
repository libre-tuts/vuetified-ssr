<template>
  <v-footer color="accent" dark app>
    <v-spacer/><span>© {{ year }} {{ app }} ® | {{ trademark }}™</span><v-spacer/>
  </v-footer>
</template>

<script>
export default {
  computed: {
    app () {
      return this.$env.APP_NAME
    },
    trademark () {
      return this.$env.APP_TRADEMARK
    },
    year () {
      return (new Date()).getFullYear()
    }
  },
  mounted () {

  }
}
</script>