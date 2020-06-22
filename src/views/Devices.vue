<template v-once>
  <section class="section">
    <h1>Devices</h1>
    <div class="cards">
      <Card
        v-for="(device, index) in devices"
        :key="index"
        :name="device.name"
        :bulbs="[device]"
        @action="toggleOverlay"
      />
    </div>
    <div class="overlay">
      <transition name="toggle">
        <CardOverlay v-if="showOverlay" @toggle="toggleOverlay" v-bind="selected" />
      </transition>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import Card from '@/components/Card.vue';
import CardOverlay from '@/components/overlays/CardOverlay.vue';

export default {
  name: 'Home',
  components: { Card, CardOverlay },
  data() {
    return { showOverlay: false, selected: {} };
  },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
      loading: state => state.loading,
    }),
  },
  methods: {
    toggleOverlay(item) {
      this.selected = item;
      this.showOverlay = !this.showOverlay;
    },
  },
};
</script>

<style lang="scss">
.cards {
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

.toggle-enter-active {
  transition: all 0.5s ease;
}
.toggle-leave-active {
  transition: all 0.5s ease;
}
.toggle-enter,
.toggle-leave-to {
  transform: translateY(-50vh);
  opacity: 0;
}
</style>
