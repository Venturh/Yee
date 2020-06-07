<template>
  <div class="card">
    <div class="top">
      <span>{{ name }}</span>
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
        progressColor="var(--primary)"
        knobColor="var(--primary)"
        :circle-width="10"
        :progress-width="10"
        :knob-radius="8"
        :side="100"
        v-model="computedBright"
      ></circle-slider>
      <span class="bright">{{ bright }}%</span>
    </div>
    <div
      class="color"
      :style="{
        'background-color': `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      }"
      @click="showOverlay = !showOverlay"
    />
    <CardOverLay
      class="overlay"
      @back="showOverlay = false"
      :bulb="bulb"
      :color="rgb"
      v-if="showOverlay"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import ToggleButton from './ToggleButton.vue';
import CardOverLay from './CardOverlay';
export default {
  name: 'YeeCard',
  props: {
    name: {
      type: String,
      default: 'Device',
    },
    power: Boolean,
    bright: Number,
    rgb: Object,
    bulb: Object,
  },
  components: {
    ToggleButton,
    CardOverLay,
  },
  data() {
    return {
      brightness: this.bright,
      powers: this.power,
      showOverlay: false,
    };
  },
  computed: {
    computedPower: {
      get: function() {
        return this.powers;
      },
      set: function(value) {
        this.powers = value;
      },
    },
    computedBright: {
      get() {
        return this.brightness;
      },
      set: _.debounce(function(value) {
        this.bulb.setBright(value, 300);
      }, 200),
    },
  },
  methods: {
    toggle(value) {
      console.log('value', value);
      this.bulb.setPower(value);
    },
  },
  watch: {
    bright(value) {
      this.brightness = value;
    },
    power(value) {
      this.powers = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background: var(--item);
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
