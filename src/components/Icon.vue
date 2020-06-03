<template>
  <component :is="dynamicIcon" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    dynamicIcon() {
      return () => import(`../assets/${this.icon}.svg`);
    },
  },
};
</script>
