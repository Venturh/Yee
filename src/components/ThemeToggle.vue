<template>
  <div
    class="test"
    @click="$emit('action', theme)"
    :style="{
      '--color': color,
      '--size': size,
      '--space': space,
    }"
  >
    <div
      class="wrapper"
      :style="{ '--selected': selected === index ? 'white' : '#42464d' }"
    >
      <div class="bg-color">
        <div class="theme-color" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeToggle',
  props: {
    theme: String,
    color: String,
    index: Number,
    selected: Number,
    size: { type: String, default: '2em' },
    space: { type: String, default: '2.5em' },
  },
};
</script>

<style scoped>
.test {
  width: var(--space);
}

.wrapper {
  background-color: var(--selected);
  border-radius: 100%;
  width: var(--size);
  height: var(--size);
  position: relative;
  cursor: pointer;
}
.bg-color {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: calc(var(--size) * 0.85);
  width: calc(var(--size) * 0.85);
  border-radius: 100%;
  background: var(--body);
}
.theme-color {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: calc(var(--size) / 2);
  width: calc(var(--size) / 2);
  border-radius: 100%;
  background: var(--color);
}
</style>
