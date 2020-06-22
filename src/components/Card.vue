<template>
  <div v-if="cardStyle == 0" class="card">
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
        :circle-width="8"
        :progress-width="8"
        :knob-radius="6"
        :side="100"
        v-model="computedBright"
      ></circle-slider>
      <span class="bright">{{ brightness }}%</span>
    </div>
    <div
      class="color"
      :style="{
        'background-color': `rgba(${bulb.rgb.r}, ${bulb.rgb.g}, ${bulb.rgb.b})`,
      }"
      @click="toggleOverlay"
    />
    <IconButton v-if="type === 'Room'" icon="settings" />
  </div>

  <div v-else class="card">
    <div class="horiz-top">
      <span>{{ name }}</span>
      <ToggleButton
        class="button"
        @toggled="toggle"
        :active="computedPower"
        size="2.5em"
      />
    </div>

    <RangeSlider class="horiz-slider" v-model="computedBright" />

    <div
      class="horiz-color"
      :style="{
        'background-color': `rgb(${bulb.rgb.r}, ${bulb.rgb.g}, ${bulb.rgb.b})`,
      }"
      @click="toggleOverlay"
    />
    <span class="horiz-bright">Brightness: {{ brightness }}%</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ToggleButton from '@/components/base/ToggleButton.vue';
import RangeSlider from '@/components/base/RangeSlider.vue';
import IconButton from '@/components/base/IconButton.vue';

export default {
  name: 'YeeCard',
  props: {
    type: { type: String, default: 'Device' },
    name: String,
    bulbs: Array,
  },
  components: {
    ToggleButton,
    RangeSlider,
    IconButton,
  },
  data() {
    return {
      brightness: this.bulbs[0].bright,
      powers: this.bulbs[0].power,
      bulb: this.bulbs[0],
      showOverlay: false,
      cardStyle: localStorage.getItem('cardstyle'),
    };
  },
  computed: {
    computedPower: {
      get: function() {
        return this.bulbs[0].power;
      },
      set: function(value) {
        this.powers = value;
      },
    },
    computedBright: {
      get() {
        return this.bulbs[0].bright;
      },
      set: function(value) {
        this.brightness = value;
        this.setBright({ bulbs: this.bulbs, bright: value });
      },
    },
  },
  methods: {
    ...mapActions('yeelight', ['setPower', 'setBright']),
    toggle(value) {
      this.setPower({ bulbs: this.bulbs, power: value });
    },
    toggleOverlay() {
      this.$emit('action', {
        name,
        bulbs: this.bulbs,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
}

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
  right: 1em;
  bottom: 1em;
  width: 1.25em;
  height: 1.25em;
  border-radius: 100%;
}

.horiz-top {
  margin: 1em 2em 0em 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.horiz-slider {
  position: absolute;
  top: 80%;
  left: 1.5em;
}

.horiz-bright {
  font-size: var(--text-button);
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.horiz-color {
  position: absolute;
  left: 50%;
  bottom: 50%;
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
