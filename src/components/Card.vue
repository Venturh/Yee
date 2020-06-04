<template>
  <div class="card">
    <div class="top">
      <span>Table</span>
      <ToggleButton
        class="button"
        @toggled="toggle"
        :active="computedPower"
        size="2.5em"
      />
    </div>
    <div class="slider">
      <circle-slider
        :stepSize="5"
        circleColor="#1e2124"
        progressColor="#9387f7"
        knobColor="#9387f7"
        :circle-width="10"
        :progress-width="10"
        :knob-radius="8"
        :side="100"
        v-model="computedBright"
      ></circle-slider>
      <span class="bright">{{ bright }}%</span>
    </div>
    <div class="color" />
  </div>
</template>

<script>
import { togglePower, changeBrightness } from '@/utils/bulbService';
import ToggleButton from './ToggleButton';
export default {
  name: 'Card',
  components: { ToggleButton },
  props: { name: String, bulb: Object, params: Object },
  data() {
    return {
      bright: this.params.bright,
    };
  },
  computed: {
    computedPower: function() {
      return this.params.power;
    },
    computedBright: {
      get() {
        return this.bright;
      },
      set(value) {
        this.bright = value;
        changeBrightness(this.bulb, value);
      },
    },
  },
  methods: {
    toggle() {
      togglePower(this.bulb, this.params.power);
    },
  },
  watch: {
    params({ bright }) {
      console.log('params -> newValue', bright);
      this.bright = bright;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background: $item;
  border-radius: 25px;
}

.top {
  margin: 1em 0.5em 0em 0.75em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slider {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.bright {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.color {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1.25em;
  height: 1.25em;
  border-radius: 100%;
  background: #000;
}
</style>
