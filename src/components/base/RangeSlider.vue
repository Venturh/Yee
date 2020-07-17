<template>
  <input
    :style="{ '--size': size }"
    type="range"
    v-model="model"
    @input="$emit('input', parseInt($event.target.value))"
  />
</template>
<script>
export default {
  name: 'RangeSlider',
  props: {
    bright: Number,
    size: { type: String, default: '1em' },
  },
  data() {
    return { model: this.bright };
  },
};
</script>

<style lang="scss" scoped>
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  overflow: hidden;
  height: var(--size);
  width: 80%;
  background: var(--body);
  border-radius: 1em;
  overflow: hidden;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: var(--size);
  height: var(--size);
  background: var(--primary);
  border-left: 0.05em solid black;
  border-radius: 1em;
  box-shadow: calc(var(--size) * -10) 0 0 calc(var(--size) * 9.5) var(--primary);
  cursor: pointer;
}
</style>
