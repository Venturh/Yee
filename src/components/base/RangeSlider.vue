<template>
  <div class="wrapper">
    <input
      class="test"
      type="range"
      v-model="model"
      @input="$emit('input', parseInt($event.target.value))"
    />
  </div>
</template>
<script>
export default {
  name: 'RangeSlider',
  props: {
    bright: Number,
  },
  data() {
    return { model: this.bright };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
}

input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  outline: transparent;
  transform: rotate(270deg);
  transform-origin: left;
  overflow: hidden;

  height: 1em;
  background: var(--body);

  border-radius: 20px;
  overflow: hidden;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1.1em;
  height: 1.1em;

  background: var(--primary);
  border-left: 0.05em solid black;
  border-radius: 20px;
  box-shadow: -800px 0 0 790px var(--primary);
  cursor: pointer;
}
</style>
