<template>
  <input type="checkbox" class="theme-switch" v-model="darkMode" />
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      darkMode: true,
    };
  },
  mounted() {
    // set 'app-background' class to body
    let bodyElement = document.body;
    bodyElement.classList.add('app-background');
  },
  watch: {
    darkMode: function() {
      // add/remove class to/from html tag
      let htmlElement = document.documentElement;

      if (this.darkMode) {
        localStorage.setItem('theme', 'dark');
        htmlElement.setAttribute('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
        htmlElement.setAttribute('theme', 'light');
      }
    },
  },
};
</script>

<style></style>
