<template>
  <div class="theme-wrapper">
    <h3>Themes</h3>
    <div class="themes">
      <ThemeToggle
        v-for="(theme, index) in themes"
        :key="index"
        v-bind="theme"
        :index="index"
        :selected="selected"
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
      selected: 0,
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
      this.checkTheme(this.theme);
    },
    checkTheme(toCheck) {
      let htmlElement = document.documentElement;
      switch (toCheck) {
        case 'shalimar':
          localStorage.setItem('theme', 'shalimar');
          htmlElement.setAttribute('theme', 'shalimar');
          this.selected = 0;
          break;
        case 'pastelgreen':
          localStorage.setItem('theme', 'pastelgreen');
          htmlElement.setAttribute('theme', 'pastelgreen');
          this.selected = 1;
          break;
      }
    },
  },
  created() {
    let theme = localStorage.getItem('theme');
    this.checkTheme(theme);
  },
};
</script>

<style>
.theme-wrapper {
  display: flex;
  align-items: center;
}

h3 {
  width: 100px;
}

.themes {
  margin-left: 1em;
  display: flex;
}
</style>
