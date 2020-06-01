<template>
  <div
    class="wrapper"
    :class="{ 'active-wrapper': a }"
    @click="toggle"
    :style="{ '--size': size }"
  >
    <div class="toggle" :class="{ 'active-toggle': a }" />
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
        return this.active;
      },
      set: function(newValue) {
        this.a = newValue;
      },
    },
  },
  methods: {
    toggle() {
      this.computedActive = !this.computedActive;
      this.$emit('toggled');
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
  background: $itemTint;
  border-radius: 50px;
}

.active-wrapper {
  background: $primary;
}

.toggle {
  position: relative;
  width: calc(var(--size) / 2.5);
  height: calc(var(--size) / 2.5);
  background: $bodyContrast;
  border-radius: 50px;
  margin: 5px;
}

.active-toggle {
  transform: translateX(calc(var(--size) * 0.7));
  width: calc(var(--size) / 6);
  height: calc(var(--size) / 3);
  margin: 0px;
}
</style>
