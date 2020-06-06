<template>
  <div @click="route" class="wrapper">
    <Icon class="icon" :icon="icon" />
    <span class="text-button">{{ name }}</span>
  </div>
</template>

<script>
import Icon from '../Icon';
export default {
  name: 'MenuItem',
  props: { name: String, icon: String, index: Number },
  components: { Icon },
  data() {
    return { selected: true };
  },
  methods: {
    route() {
      this.$emit('click', this.index);
      this.$router.push(this.icon, () => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
}
.icon {
  fill: $primary;
  height: 1.65em;

  @include lg {
    height: 1.5em;
  }
}
</style>
