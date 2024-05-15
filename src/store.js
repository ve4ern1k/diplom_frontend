import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: false,
    menuSectionHeader: '',
    authToken: ''
  },
  getters: {
  },
  mutations: {
    setAuth (state, value) {
      state.auth = value;
    },

    setMenuSectionHeader (state, value) {
      state.menuSectionHeader = value
    },
    
    setAuthToken (state, value) {
      state.authToken = value
    }
  },
  actions: {
  },
  modules: {
  }
})