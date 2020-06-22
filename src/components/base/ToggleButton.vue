<template>
  <div
    class="wrapper"
    :class="{ 'active-wrapper': computedActive }"
    @click="toggle"
    :style="{ '--size': size }"
  >
    <div class="toggle" :class="{ 'active-toggle': computedActive }" />
  </div>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: {
    active: Boolean,
    size: { type: String, default: '75px' },
  },
  data() {
    return { a: this.active };
  },
  computed: {
    computedActive: {
      get: function() {
        return this.a;
      },
      set: function(newValue) {
        this.a = newValue;
      },
    },
  },
  methods: {
    toggle() {
      this.computedActive = !this.computedActive;
      this.$emit('toggled', this.computedActive);
    },
  },
  watch: {
    active(value) {
      this.computedActive = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper,
.toggle {
  transition: all 300ms ease;
}
.wrapper {
  width: var(--size);
  height: calc(var(--size) / 2);
  display: flex;
  align-items: center;
  background: var(--itemTint);
  border-radius: 50px;
}

.active-wrapper {
  background: var(--body);
}

.toggle {
  position: relative;
  width: calc(var(--size) / 4);
  height: calc(var(--size) / 4);
  background: var(--primary);
  border-radius: 50px;
  margin: 5px;
}

.active-toggle {
  transform: translateX(calc(var(--size) * 0.6));
  width: calc(var(--size) / 4);
  height: calc(var(--size) / 4);
  margin: 0px;
}
</style>
