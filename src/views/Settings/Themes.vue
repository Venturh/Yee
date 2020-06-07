<template>
  <div class="theme-wrapper">
    <h3>Themes</h3>
    <div class="themes">
      <ThemeToggle
        v-for="(theme, index) in themes"
        :key="index"
        v-bind="theme"
        size="1.85em"
        space="3em"
        @action="changeTheme"
      />
    </div>
  </div>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue';
export default {
  components: { ThemeToggle },
  data() {
    return {
      theme: 'shalimar',
      themes: [
        { theme: 'shalimar', color: '#FEFFBE' },
        { theme: 'pastelgreen', color: '#58e887' },
      ],
    };
  },
  methods: {
    changeTheme(value) {
      this.theme = value;
    },
  },
  watch: {
    theme() {
      let htmlElement = document.documentElement;
      switch (this.theme) {
        case 'shalimar':
          localStorage.setItem('theme', 'shalimar');
          htmlElement.setAttribute('theme', 'shalimar');
          break;
        case 'pastelgreen':
          localStorage.setItem('theme', 'pastelgreen');
          htmlElement.setAttribute('theme', 'pastelgreen');
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
.theme-wrapper {
  display: flex;
  align-items: center;
}

.themes {
  margin-left: 1em;
  display: flex;
}
</style>
