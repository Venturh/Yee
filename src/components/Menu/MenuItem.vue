<template>
  <div @click="route" class="wrapper">
    <Icon class="icon" :icon="icon" />
    <p class="text-button">{{ name }}</p>
  </div>
</template>

<script>
import Icon from '../Icon';
export default {
  name: 'MenuItem',
  props: { name: String, icon: String },
  components: { Icon },
  methods: {
    route() {
      this.$router.push(this.icon);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  fill: $primary;
  height: 2em;
}
</style>
