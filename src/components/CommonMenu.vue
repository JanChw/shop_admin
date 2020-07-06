<template>
  <div class="menu">
    <el-tabs tab-position="left">
    <el-tab-pane v-for="(menu, index) in menuData" :key="index">
      <span slot="label">
        <router-link :to="menu.path" tag="span">
          <i :class="'el-icon-' + menu.icon"></i>
          {{ menu.label }}
        </router-link>
      </span>
      <ul class="submenu" v-if="menu.children">
        <li v-for="(subMenu, subIndex) in menu.children" :key="index + '-' + subIndex"><router-link :to="subMenu.path || '/'" tag="span">{{ subMenu.label }}</router-link></li>
      </ul>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
// todo tabs加动画
<script>
export default {
  data () {
    return {
      menuData: [
        {
          label: '首页',
          icon: 's-home',
          path: '/'
        },
        {
          label: '商品',
          icon: 'goods',
          path: '/goods',
          children: [
            {
              label: '商品管理',
              path: '/goods'
            },
            {
              label: '产品管理',
              path: '/product'
            },
            {
              label: '分类管理',
              path: '/category'
            },
            {
              label: '品牌管理',
              path: ''
            },
            {
              label: '标签管理',
              path: ''
            },
            {
              label: '属性管理',
              path: ''
            }
          ]
        },
        {
          label: '用户',
          icon: 'user',
          path: '',
          children: [
            {
              label: '用户管理',
              icon: ''
            }
          ]
        },
        {
          label: '订单',
          icon: 'menu',
          path: '',
          children: [
            {
              label: '订单管理',
              icon: ''
            }
          ]
        },
        {
          label: '权限',
          icon: 'setting',
          path: '',
          children: [
            {
              label: '权限管理',
              icon: 'key'
            }
          ]
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .menu {
    height: 100%;
    background: $main-color2;
    .el-tabs--left .el-tabs__header.is-left {
      margin-right: 0;
      padding-top: 20px;
    }
    .el-tabs__item.is-active {
      color: white;
    }
    .el-tabs__active-bar {
      background-color: $main-color6;
      top: 20px;
    }
    .el-tabs__item {
      color: darken($main-color4, 30);
      &:hover {
        color: white;
      }
    }

    .submenu {
      box-sizing: border-box;
      background: white;
      color: darken($main-color4, 50);
      height: 100%;
      margin: 0 auto;
      padding-top: 20px;
      list-style: none;
      text-align: center;
      li {
        margin: 0 20px;
        width: 80px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>
