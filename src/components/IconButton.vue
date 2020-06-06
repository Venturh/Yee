<template>
  <button @click="$emit('action')" class="button" :style="{ '--size': size }">
    <Icon class="icon" :icon="icon" />
  </button>
</template>

<script>
import Icon from './Icon';
export default {
  name: 'IconButton',
  props: {
    icon: String,
    text: String,
    size: { type: String, default: '2em' },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
.button {
  border: none;
  outline: none;
  background: $item;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  height: var(--size);
  width: var(--size);
  cursor: pointer;
}

.icon {
  fill: $primary;
  height: calc(var(--size) / 2);
}
</style>
