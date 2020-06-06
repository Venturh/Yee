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
    <pre>{{ params }}</pre>
    <div
      class="color"
      :style="{
        'background-color': `rgb(${color.r}, ${color.g}, ${color.b})`,
      }"
      @click="showOverlay = !showOverlay"
    />
    <CardOverLay
      class="overlay"
      @back="showOverlay = false"
      :bulb="bulb"
      :color="color"
      v-if="showOverlay"
    />
  </div>
</template>

<script>
import _ from 'lodash';

import { togglePower, changeBrightness } from '@/utils/bulbService';
import ToggleButton from './ToggleButton';
import CardOverLay from './CardOverlay';

export default {
  name: 'Card',
  components: { ToggleButton, CardOverLay },
  props: { name: String, bulb: Object, params: Object },
  data() {
    return {
      bright: this.params.bright,
      color: this.params.rgb,
      showOverlay: false,
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
      set: _.debounce(function(value) {
        changeBrightness(this.bulb, value);
      }, 200),
    },
  },
  methods: {
    toggle() {
      togglePower(this.bulb, this.params.power);
    },
  },
  watch: {
    params({ bright, rgb }) {
      this.bright = bright;
      this.color = rgb;
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
}

.overlay {
  position: absolute;
  top: 51%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
