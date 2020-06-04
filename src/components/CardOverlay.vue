<template>
  <div class="picker">
    <chrome-picker
      class="test"
      :disableAlpha="true"
      :disableFields="true"
      v-model="colors"
    />
    {{ colors.rgba }}
    <button @click="changeColor">Change</button>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';

import { changeHue } from '@/utils/bulbService';
import { rgbToHsv } from '@/utils/helper';

export default {
  name: 'CardOverlay',
  components: { 'chrome-picker': Chrome },
  data() {
    return {
      colors: {
        hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
      },
    };
  },
  methods: {
    changeColor() {
      const hsv = rgbToHsv(this.colors.rgba);
      changeHue(this.devices[0].bulb, hsv);
    },
  },
};
</script>

<style lang="scss" scoped>
.test,
.vc-chrome__disable-alpha {
  background: $itemShade;

  border-radius: 100%;
}
.test .vc-chrome-body {
  background: $itemShade;
}
</style>
