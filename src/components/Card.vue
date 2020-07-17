<template>
  <div class="card">
    <div class="top">
      <div class="info">
        <IconButton v-if="type === 'Room'" icon="settings" size="1.25em" />
        <span>{{ name }}</span>
      </div>
      <ToggleButton class="button" @toggled="toggle" :active="computedPower" size="2.5em" />
    </div>
    <div class="bottom">
      <RangeSlider class="slider" size="1.5em" v-model="computedBright" />
      <div
        class="color"
        :style="{
        'background-color': `rgb(${bulb.rgb.r}, ${bulb.rgb.g}, ${bulb.rgb.b})`,
      }"
        @click="toggleOverlay"
      />
    </div>
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
      powers: this.computedPower,
      bulb: this.bulbs[0],
      showOverlay: false,
      cardStyle: localStorage.getItem('cardstyle'),
    };
  },
  computed: {
    computedPower: {
      get: function() {
        //check if any device is powered
        let powers = 0;
        this.bulbs.forEach(bulb => {
          if (bulb.power) powers += 1;
        });
        if (powers) return true;
        else return false;
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
        name: this.name,
        bulbs: this.bulbs,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background: var(--item);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em 1em;
}

.info {
  display: flex;
  align-items: center;

  span {
    margin-left: 0.5em;
  }
}

.bottom {
  position: absolute;
  bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 0.5em;
}

.color {
  width: 1.25em;
  height: 1.25em;
  border-radius: 100%;
}

.overlay {
}
</style>
