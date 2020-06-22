<template>
  <Icon
    :icon="icon"
    :style="{
      '--color': selected ? 'var(--primary)' : 'var(--itemTint)',
    }"
    @action="check"
  />
</template>

<script>
import Icon from '@/components/base/Icon.vue';
export default {
  props: { icon: String, toCheck: Object },
  components: { Icon },
  data() {
    return { selected: false };
  },
  methods: {
    check() {
      this.selected = !this.selected;
      this.$emit('check', {
        device: this.toCheck,
        value: this.selected,
      });
    },
  },
};
</script>

<style scoped>
svg {
  fill: var(--color);
  height: 1em;
  cursor: pointer;
}
</style>
