<template>
  <div class="picker">
    <chrome-picker
      :disableFields="true"
      :disableAlpha="true"
      v-model="colors"
    />
    <div @click="$emit('back')" class="out" />
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
    color(value) {
      console.log('color -> va', value);
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
  background: rgb(140, 0, 255);
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
