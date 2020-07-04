<template>
  <div class="header">
    <div class="company">在线小店</div>
    <div class="user">
      <el-dropdown placement="bottom">
        <el-avatar :src="userImg"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/" tag="span">
              个人中心
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userImg:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  background-color: $main-color;
  .company {
    margin-left: 30px;
  }
  .user {
    margin-right: 30px;
  }
}
</style>
