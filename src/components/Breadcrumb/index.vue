<template>
  <el-breadcrumb v-if="Array.isArray(breadcrumb)" class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="item.title">
        <a v-if="item.path && index !== breadcrumb.length - 1" @click.prevent="handleLink(item)">{{ item.title }}</a>
        <span v-else class="no-redirect">{{ item.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

export default {
  obviousData: {
    breadcrumb: 'breadcrumb'
  },
  methods: {
    handleLink(item) {
      const { path } = item
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
