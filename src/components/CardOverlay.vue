<template>
  <div class="picker">
    <chrome-picker
      :disableFields="true"
      :disableAlpha="true"
      v-model="colors"
    />
    <div
      class="out"
      @click="$emit('back')"
      :style="{
        background: 'rgb(colors.rgba.r, colors.rgba.b, colors.rgba.g)',
      }"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import { Chrome } from 'vue-color';

export default {
  name: 'CardOverlay',
  components: { 'chrome-picker': Chrome },
  props: { bulb: Object, rgb: Object },
  data() {
    return {
      colors: {
        rgba: this.rgb,
      },
    };
  },
  methods: {
    changeColor: _.debounce(function({ r, g, b }) {
      this.bulb.setRGB([r, g, b], 300);
    }, 200),
  },
  watch: {
    colors({ rgba }) {
      this.changeColor(rgba);
    },
  },
};
</script>

<style lang="scss" scoped>
.picker {
}

.out {
  position: absolute;
  width: 1.25em;
  height: 1.25em;
  border-radius: 100%;
  bottom: 0.3em;
  left: 0.75em;
  z-index: 1;
}

//color box
/deep/ .vc-chrome-body {
  background-color: var(--item);
  border-radius: 0 0 8px 8px;
  height: 0.75em;
}

//sat box
/deep/ .vc-chrome-saturation-wrap {
  border-radius: 8px 8px 0px 0;
}

//picker box
/deep/ .vc-chrome {
  background: var(--item);
  border-radius: 20px;
}
</style>
