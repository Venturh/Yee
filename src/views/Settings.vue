<template>
  <div class="wrapper">
    <h1>Settings</h1>
    <div class="devices">
      <h3>Devices</h3>
      <YeeItem
        v-for="(item, index) in devices"
        :key="index"
        @onEnter="change"
        v-bind="item"
      />
    </div>
    <div class="theme">
      <ThemeToggle />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import YeeItem from '@/components/YeeItem.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

export default {
  name: 'Settings',
  components: { YeeItem, ThemeToggle },
  data() {
    return {
      name: '',
    };
  },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
      loading: state => state.loading,
      discovering: state => state.discovering,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['discovery', 'setName']),
    change(props) {
      this.setName({ bulb: props.bulb, name: props.name });
    },
  },
  created() {
    this.discovering ? null : this.discovery();
  },
};
</script>

<style lang="scss" scoped></style>
