import Vue from 'vue';
import Vuex from 'vuex';
import yeelight from './yeelight';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    yeelight,
  },
});
