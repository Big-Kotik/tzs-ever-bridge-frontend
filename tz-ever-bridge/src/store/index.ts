import { createStore } from 'vuex'
import {TezosToolkit} from "@taquito/taquito";

export default createStore({
  state: {
    tezos: new TezosToolkit('http://127.0.0.1:20000'),
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
