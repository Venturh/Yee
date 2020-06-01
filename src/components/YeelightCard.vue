<template>
  <div class="card">
    <div class="upper">
      <div class="info">
        <img src="@/assets/bulb.png" alt="bulb" />
        <span>{{ name }}</span>
      </div>
      <ToggleButton @toggled="toggle" :active="computedPower" size="50px" />
    </div>
    <div class="bottom">
      <span>{{ computedPower }}</span>
    </div>
  </div>
</template>

<script>
import { togglePower } from '@/utils/bulbService';
import ToggleButton from './ToggleButton';

export default {
  name: 'Yeelight',
  props: { name: String, bulb: Object, power: Boolean },
  components: { ToggleButton },
  computed: {
    computedPower: function() {
      return this.power;
    },
  },
  methods: {
    toggle() {
      togglePower(this.bulb, this.power);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  height: 10vh;
  background: $item;
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
}

.upper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.info {
}

button {
}

.bottom {
  position: absolute;
  bottom: 0;
}
</style>
