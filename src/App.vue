<template>
  <div class="app">
    <Menu :menuItems="menuItems" logo="bulb" routed />
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Menu from '@/components/menu/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
  },
  data() {
    return {
      menuItems: [
        'Dashboard',
        'Devices',
        'Rooms',
        'Scenes',
        'Settings',
      ],
    };
  },
  computed: {
    ...mapState('yeelight', {
      discovering: state => state.discovering,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['discovery']),
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
    this.discovering ? null : this.discovery();
    this.loadTheme();
  },
};
</script>

<style>
.app {
  display: flex;
}
</style>
