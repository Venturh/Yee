<template>
  <div
    class="wrapper"
    @click="$emit('action', font)"
    :style="{
      borderBottom: selected === index ? '2px solid white' : 'inherit',
    }"
  >
    <Icon class="icon" :icon="icon" :style="{ width: size }" />
  </div>
</template>

<script>
import Icon from '@/components/Icon';
export default {
  name: 'FontToggle',
  props: {
    font: String,
    icon: String,
    size: String,
    index: Number,
    selected: Number,
  },
  components: {
    Icon,
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid white;
}

.icon {
  fill: white;
}
</style>
