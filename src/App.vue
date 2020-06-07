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
      let fontSize = localStorage.getItem('fontSize');

      if (theme === 'shalimar') {
        htmlElement.setAttribute('theme', 'shalimar');
      } else if (theme === 'pastelgreen') {
        htmlElement.setAttribute('theme', 'pastelgreen');
      }

      if (fontSize === 'small') {
        htmlElement.setAttribute('fontSize', 'small');
      } else if (fontSize === 'medium') {
        htmlElement.setAttribute('fontSize', 'medium');
      } else if (fontSize === 'large') {
        htmlElement.setAttribute('fontSize', 'large');
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
