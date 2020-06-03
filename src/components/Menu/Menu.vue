<template>
  <div class="menu">
    <div class="upper">
      <MenuItem name="Dashboard" icon="dashboard" />
      <MenuItem name="Rooms" icon="rooms" />
      <MenuItem name="Scenes" icon="scenes" />
    </div>

    <div class="down">
      <MenuItem name="Settings" icon="settings" />
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
  name: 'Menu',
  components: { MenuItem },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 8vw;
  height: 100vh;
  background: $item;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  :nth-child(n) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @include xl {
    width: 10vw;
  }
  @include md {
    width: 20vw;
  }
}
.upper {
  margin-top: 1em;
}

.down {
  margin-bottom: 1em;
}
</style>
