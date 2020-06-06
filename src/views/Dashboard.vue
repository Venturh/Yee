<template v-once>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <div class="bulbs">
      <YeeCard v-for="(item, index) in devices" :key="index" v-bind="item" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import YeeCard from '@/components/YeeCard.vue';

export default {
  name: 'Home',
  components: { YeeCard },
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
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-template-rows: repeat(3, minmax(180px, 1fr));
  gap: 1em;
}
</style>
