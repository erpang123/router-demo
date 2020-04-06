<template>
  <el-submenu v-if="item.sonList" :index="i">
    <template slot="title">
      <i v-if="item.icon" :class="item.icon" />
      <span>{{ item.name }}</span>
    </template>
    <slot />
  </el-submenu>
  <el-menu-item v-else :index="i">
    <i v-if="item.icon" :class="item.icon" />
    <router-link slot="title" :to="item.path">
      {{ item.name }}
    </router-link>
  </el-menu-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    i: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
