<template>
  <div class="app">
    <Menu />
    <router-view />
  </div>
</template>

<script>
import Menu from '@/components/Menu/Menu.vue';
export default {
  name: 'App',
  components: {
    Menu,
  },
};
</script>

<style lang="scss">
.app {
  display: flex;
}
</style>
