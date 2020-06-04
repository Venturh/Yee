<template v-once>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <div class="bulbs">
      <Card
        v-for="(item, index) in devices"
        :key="index"
        :bulb="item.bulb"
        name="Plazuhalter"
        :params="item.params"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Card from '@/components/Card';

export default {
  name: 'Home',
  components: { Card },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
      loading: state => state.loading,
      discovering: state => state.discovering,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['discovery']),
  },
  created() {
    this.discovering ? null : this.discovery();
  },
};
</script>

<style lang="scss">
.wrapper {
  width: 90vw;
  margin: 0 5% 0 5%;
}

.bulbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 250px));
  grid-template-rows: repeat(auto-fit, minmax(100px, 180px));
  gap: 1em;
}
</style>
