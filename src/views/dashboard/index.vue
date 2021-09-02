<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome: {{ name }}</div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',

  obviousData: {
    name: 'user.name',
    breadcrumb: 'breadcrumb'
  },

  created() {
    this.breadcrumb = [
      { title: 'Dashboard', path: '/dasdas/dasda/dasdas' },
      { title: 'dasdasd', path: '/dsa/dasd/dasd' }
    ]
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
