<template>
  <div class="item">
    <div class="name-wrapper">
      <IconButton
        icon="edit"
        size="2em"
        @action="disabledName = !disabledName"
      />
      <input
        class="name-input"
        :class="{ 'name-input-active': disabledName === false }"
        v-on:keyup.enter="onEnter"
        v-model="names"
        :disabled="disabledName"
      />
    </div>
  </div>
</template>

<script>
import IconButton from './IconButton.vue';
export default {
  name: 'YeeItem',
  components: { IconButton },
  props: {
    bulb: Object,
    name: String,
    power: Boolean,
  },
  data() {
    return {
      names: this.name,
      disabledName: true,
    };
  },
  methods: {
    onEnter() {
      this.disabledName = true;
      this.$emit('onEnter', { bulb: this.bulb, name: this.names });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  background: $item;
}

.name-wrapper {
  margin: 0 1em;
  display: flex;
}

.name-input {
  width: 50%;
  border: none;
  outline: none;
  color: $itemContrast;
  background: $item;
  font-size: $text-body;
}

.name-input-active {
  border-bottom: 1px solid springgreen;
}
</style>
