<template v-once>
  <section class="section">
    <h1>Dashboard</h1>
    <div class="bulbs">
      <YeeCard v-for="(item, index) in devices" :key="index" v-bind="item" />
    </div>
  </section>
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
.bulbs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-auto-rows: minmax(10em, 1fr);
  gap: 1em;
}
</style>
