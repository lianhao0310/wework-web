import Vue from "vue";
require('es6-promise').polyfill()
import Vuex from "vuex";

Vue.use(Vuex)
const state = {
  navState1: true,
  navState2: false,
  navState3: true,
  navState4: false,
  projectName: "项目名称",
  url: "",
  colorIndex: 0,
  urltoId: ""
  // ,
  // templates:[]
}
const mutations = {
  myproject(state) {
    state.navState1 = true;
    state.navState2 = false;
  },
  createproject(state) {
    state.navState1 = false;
    state.navState2 = true;
  },
  config(state) {
    state.navState3 = true;
    state.navState4 = false;
  },
  articleUrl(state) {
    state.navState3 = false;
    state.navState4 = true;
  },
  newmyproject(state) {
    state.navState1 = true,
      state.navState2 = false,
      state.navState3 = true,
      state.navState4 = false
  }
}
export default new Vuex.Store({
  state,
  mutations
})
