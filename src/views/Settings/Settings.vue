<template>
  <div class="wrapper">
    <h1>Settings</h1>
    <Themes />
    <div class="devices">
      <h3>Devices</h3>
      <YeeItem
        v-for="(item, index) in devices"
        :key="index"
        @onEnter="change"
        v-bind="item"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Themes from './Themes.vue';
import YeeItem from '@/components/YeeItem.vue';

export default {
  name: 'Settings',
  components: { YeeItem, Themes },
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

<style scoped>
.wrapper {
  width: 100%;
  margin: 0 5% 0 5%;
}
</style>
