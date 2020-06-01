<template>
  <div>
    <h1>Dashboard</h1>
    <p v-for="(item, index) in devices" :key="index">
      Test{{ item.params.power }}
    </p>
    <div class="bulbs">
      <YeelightCard
        v-for="(item, index) in devices"
        :key="index"
        :bulb="item.bulb"
        name="Plazuhalter"
        :power="item.params.power"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import YeelightCard from '@/components/YeelightCard';

export default {
  name: 'Home',
  components: { YeelightCard },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
      loading: state => state.loading,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['discovery']),
  },
  created() {
    this.discovery();
  },
};
</script>

<style lang="scss">
.bulbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1em;
}
</style>
