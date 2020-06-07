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

      if (theme === 'shalimar') {
        htmlElement.setAttribute('theme', 'shalimar');
      } else if (theme === 'pastelgreen') {
        htmlElement.setAttribute('theme', 'pastelgreen');
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
