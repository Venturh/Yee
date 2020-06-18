<template v-once>
  <section class="section">
    <h1>Dashboard</h1>
    <div class="bulbs">
      <YeeCard
        v-for="(item, index) in devices"
        :key="index"
        v-bind="item"
        @action="toggleOverlay"
      />
    </div>
    <div v-if="showOverlay" class="overlay">
      <Overlay @toggle="toggleOverlay" v-bind="selected" />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import YeeCard from '@/components/YeeCard.vue';
import Overlay from '@/components/Overlay/Overlay.vue';

export default {
  name: 'Home',
  components: { YeeCard, Overlay },
  data() {
    return { showOverlay: false, selected: {} };
  },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
      loading: state => state.loading,
      discovering: state => state.discovering,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['discovery']),
    toggleOverlay(item) {
      this.selected = item;
      this.showOverlay = !this.showOverlay;
    },
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
  gap: 4em;
}

.overlay {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
</style>
