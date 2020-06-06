<template>
  <div class="wrapper">
    <h1>Settings</h1>
    <Card
      v-for="(item, index) in devices"
      :key="index"
      :bulb="item.bulb"
      name="Plazuhalter"
      :params="item.params"
    />
    <input v-model="name" type="text" />
    <button @click="change">Change Name</button>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Settings',
  components: { Card },
  data() {
    return {
      name: '',
    };
  },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
      loading: state => state.loading,
      discovering: state => state.discovering,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['discovery', 'setName']),
    change() {
      this.setName({ bulb: this.devices[0], name: this.name });
    },
  },
  created() {
    this.discovering ? null : this.discovery();
  },
};
</script>

<style lang="scss" scoped></style>
