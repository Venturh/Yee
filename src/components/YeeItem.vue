<template>
  <div class="item">
    <Input @onEnter="changeName" :placeholder="name" />
    <button @click="remove">DELETE</button>
  </div>
</template>

<script>
import Input from '@/components/base/Input.vue';

export default {
  name: 'YeeItem',
  components: { Input },
  props: {
    bulb: Object,
    name: String,
    power: Boolean,
    type: String,
  },
  methods: {
    changeName(newName) {
      this.$emit('changeName', {
        type: this.type,
        bulb: this.bulb,
        newName: newName,
        oldName: this.name,
      });
    },
    remove() {
      this.$emit('removeItem', { type: this.type, name: this.name });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  background: var(--item);
}

.name-wrapper {
  margin: 0 1em;
  display: flex;
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
