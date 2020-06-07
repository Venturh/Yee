<template>
  <div @click="route" class="wrapper">
    <Icon class="icon" :icon="icon" />
    <span class="text-button">{{ itemName }}</span>
    <div v-if="currentRoute === itemName" class="indicator" />
  </div>
</template>

<script>
import Icon from '../Icon';
export default {
  name: 'MenuItem',
  props: { itemName: String, currentRoute: String },
  computed: {
    icon() {
      return this.itemName.toLowerCase();
    },
  },
  components: { Icon },
  methods: {
    route() {
      this.$emit('click', this.itemName);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
}
.icon {
  fill: var(--primary);
  height: 1.65em;
}
span {
  color: var(--itemContrast);
}

.indicator {
  position: absolute;
  right: 0;
  width: 3%;
  height: 4vh;
  background: var(--primary);
  border-radius: 10px;
}
</style>
