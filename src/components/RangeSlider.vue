<template>
  <input
    type="range"
    v-model="model"
    v-on:change="onChange"
    class="slider"
    :style="{ '--height': height, '--width': width }"
  />
</template>
<script>
export default {
  name: 'RangeSlider',
  props: {
    value: Number,
    height: { type: String, default: '2vh' },
    width: { type: String, default: '100%' },
  },
  data() {
    return { model: this.value };
  },
  methods: {
    onChange() {
      this.$emit('onChange', this.inputHandle);
    },
  },
  computed: {
    inputHandle() {
      return this.model;
    },
  },
  watch: {
    value(value) {
      this.model = value;
    },
  },
};
</script>

<style lang="scss" scoped>
input[type='range'] {
  --width: 100%;
  --height: 2vh;
  -webkit-appearance: none;
  background-color: transparent;
  height: var(--height);
  width: var(--width);
  outline: transparent;
  border-radius: 20px;
  overflow: hidden;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: $itemContrast;
  border-radius: 20px;
  box-shadow: -460px 0 0 450px $primary;
  cursor: pointer;
  height: var(--height);
  width: calc(var(--width) * 0.1);
  border: 0;
}
</style>
