<template>
  <div id="App" class="index">
    <el-header>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        router
        @select="handleSelect"
      >
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
          <template slot="title">
            <!--            <i class="el-icon-s-marketing"-->
            <i :class="item.icon"></i>
            <span> {{ item.navItem }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <div style="position:fixed;text-align:center;bottom:0;margin:0 auto;width:100%;color: #5c6b77">
      <a href="https://beian.miit.gov.cn/" style="color: #5c6b77" target="_blank">蜀ICP备2021025507号-1</a>&nbsp;
      @2021-2022
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      navList: [
        {name: '/', navItem: '首页', icon: 'el-icon-s-home'},
        {name: '/about', navItem: '发现项目', icon: 'el-icon-s-custom'},
        {name: '/demo', navItem: '文件列表', icon: 'el-icon-s-goods'},
        {name: '/bar', navItem: '柱状图', icon: 'el-icon-s-grid'},
        {name: '/map', navItem: '位置展示', icon: 'el-icon-s-marketing'}
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
    }
  }
}
</script>
