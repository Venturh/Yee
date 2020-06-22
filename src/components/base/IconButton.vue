<template>
  <Icon
    class="icon"
    :icon="icon"
    @action="$emit('action')"
    :style="{ '--size': size }"
  />
</template>

<script>
import Icon from '@/components/base/Icon.vue';
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
  background: var(--item);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  height: calc(var(--size) * 2);
  width: calc(var(--size) * 2);
  cursor: pointer;
}

.icon {
  fill: var(--primary);
  height: var(--size);
  cursor: pointer;
}
</style>
