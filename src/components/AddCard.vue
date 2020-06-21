<template>
  <div class="add-card">
    <IconButton
      class="icon"
      icon="add"
      @action="$emit('add')"
      size="3em"
    />
  </div>
</template>

<script>
import IconButton from '@/components/IconButton.vue';
export default {
  components: { IconButton },
};
</script>

<style lang="scss" scoped>
.add-card {
  position: relative;
  background: var(--item);
  border-radius: 25px;
}

.icon {
  height: 3em;
  fill: var(--primary);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
