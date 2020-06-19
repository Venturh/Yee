<template v-once>
  <section class="section">
    <h1>Devices</h1>
    <div class="bulbs">
      <YeeCard
        v-for="(item, index) in devices"
        :key="index"
        :name="item.name"
        :power="item.power"
        :bright="item.bright"
        :rgb="item.rgb"
        :bulb="item"
        @action="toggleOverlay"
      />
    </div>
    <div class="overlay">
      <transition name="toggle">
        <Overlay v-if="showOverlay" @toggle="toggleOverlay" v-bind="selected" />
      </transition>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import YeeCard from '@/components/YeeCard.vue';
import Overlay from '@/components/Overlay.vue';

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

.toggle-enter-active {
  transition: all 0.5s ease;
}
.toggle-leave-active {
  transition: all 0.5s ease;
}
.toggle-enter, .toggle-leave-to
/* .toggle-leave-active below version 2.1.8 */ {
  transform: translateY(-50vh);
  opacity: 0;
}
</style>
