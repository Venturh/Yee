<template>
  <div class="wrapper">
    <IconButton icon="edit" size="2em" @action="disabled = !disabled" />
    <input
      class="name-input"
      :class="{ 'name-input-active': disabled === false }"
      v-on:keyup.enter="onEnter"
      v-model="input"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import IconButton from '@/components/base/IconButton';
export default {
  props: {
    placeholder: String,
    propDisabled: { type: Boolean, default: true },
  },
  components: {
    IconButton,
  },
  data() {
    return {
      disabled: this.propDisabled,
      input: '',
    };
  },
  methods: {
    onEnter() {
      this.disabled = true;
      this.$emit('action', this.input);
    },
  },
};
</script>

<style langs="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.name-input {
  width: 50%;
  border: none;
  outline: none;
  color: var(--itemContrast);
  background: var(--item);
  font-size: var(--text-body);
}

.name-input-active {
  border-bottom: 1px solid springgreen;
}
</style>
