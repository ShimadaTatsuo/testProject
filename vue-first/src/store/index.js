import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  mode: '',
}

const mutations = {
  commitModeToDev(state, payload) {
    state.mode = 'development'
  },
  commitModeToPro(state, payload) {
    state.mode = 'production'
  },
}

const actions = {
  getSomething({ commit }, payload) {
    const num1 = 1
    const num = 2
  },
  updateModeDev({ commit }, payload) {
    commit('commitModeToDev', payload)
  },
  updateModePro({ commit }, payload) {
    commit('commitModeToPro', payload)
  },
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
})
