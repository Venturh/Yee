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
  methods: {
    loadTheme() {
      let htmlElement = document.documentElement;
      let theme = localStorage.getItem('theme');

      if (theme === 'dark') {
        htmlElement.setAttribute('theme', 'dark');
      } else {
        htmlElement.setAttribute('theme', 'light');
      }
    },
  },
  created() {
    this.loadTheme();
  },
};
</script>

<style>
.app {
  display: flex;
}
</style>
