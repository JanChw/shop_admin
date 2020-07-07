<template>
  <el-container>
    <el-aside>
      <!-- <slot name="aside"></slot> -->
      <CommonMenu />
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from '../components/CommonHeader'
import CommonMenu from '../components/CommonMenu'
export default {
  components: {
    CommonHeader,
    CommonMenu
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .el-main {
    margin: 20px;
    background: white;
  }

  .el-aside {
    // height: 100%;
    width: auto!important;
  }
</style>
