<template>
  <div class="card">
    <div class="upper">
      <div class="info">
        <div>
          <img class="mr-1" src="@/assets/bulb.png" alt="bulb" />
          <span class="text-subtitle">Tisch</span>
        </div>
        <span class="text-button"
          >Brightness: {{ computedBrightness + ' %' }}</span
        >
      </div>

      <ToggleButton @toggled="toggle" :active="computedPower" size="2.5em" />
    </div>
    <div class="bottom">
      <RangeSlider
        @onChange="setBrightness"
        :value="computedBrightness"
        height="1.5vh"
        width="100%"
      />
    </div>
  </div>
</template>

<script>
import { togglePower, changeBrightness } from '@/utils/bulbService';
import ToggleButton from './ToggleButton';
import RangeSlider from './RangeSlider';

export default {
  name: 'Yeelight',
  props: { name: String, bulb: Object, params: Object },
  components: { ToggleButton, RangeSlider },
  computed: {
    computedPower: function() {
      return this.params.power;
    },
    computedBrightness() {
      return this.params.bright;
    },
  },
  methods: {
    toggle() {
      console.log('togglePower', this.computedPower);
      togglePower(this.bulb, this.params.power);
    },
    setBrightness(newBright) {
      console.log('brightness', newBright);
      changeBrightness(this.bulb, newBright);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  --height: 10vh;
  position: relative;
  height: var(--height);
  background: $item;
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 10px;
}

.upper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.info {
  height: 6vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

img {
  height: 1.25em;
  width: 1.25em;
}

.bottom {
  width: 100%;
}
</style>
