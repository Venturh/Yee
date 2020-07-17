import Vue from 'vue';
import Vuex from 'vuex';
import yeelight from './yeelight';
import rooms from './rooms';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    yeelight,
    rooms,
  },
});
