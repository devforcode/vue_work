import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    cachedViews: [],
  },
  getters: {
    getDrawer: (state) => state.drawer,
  },
  mutations: {
    setDrawer(state, data) {
      state.drawer = data;
    },
  },
  actions: {},
  modules: {},
});
