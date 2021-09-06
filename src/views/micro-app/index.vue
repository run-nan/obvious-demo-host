<template>
  <obvious-app :ctx="appName" @error="onError" />
</template>

<script>
export default {
  name: 'MicroApp',

  computed: {
    appName() {
      console.log(`${this.$route.params.user}/${this.$route.params.repo}`)
      return `${this.$route.params.user}/${this.$route.params.repo}`
    }
  },

  methods: {
    onError(error) {
      console.log(error.message)
      if (error.message.startsWith('[obvious]')) {
        this.$router.push({ name: '404' })
      } else {
        throw error
      }
    }
  }
}
</script>
