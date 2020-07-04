<template>
  <el-container>
    <el-aside width="200px">
      <slot name="aside"></slot>
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from '../components/CommonHeader'
export default {
  components: {
    CommonHeader
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .el-main {
    margin: 20px;
    background: white;
  }
</style>
