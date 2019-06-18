import Vue from 'vue';
import Vuex from 'vuex';
import VuexWebExtensions from 'vuex-webextensions';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windows: [],
    currentLayout: '1x2',
    layouts: {
      '1x1': {
        cols: 1,
        rows: 1,
        nextIndex: 1,
        active: true,
      },
      '1x2': {
        cols: 1,
        rows: 2,
        nextIndex: 1,
        active: false,
      },
      '2x1': {
        cols: 2,
        rows: 1,
        nextIndex: 1,
        active: false,
      },
      '2x2': {
        cols: 2,
        rows: 2,
        nextIndex: 1,
        active: false,
      },
    },
  },
  getters,
  mutations,
  actions,
  plugins: [
    VuexWebExtensions({
      persistentStates: ['windows', 'currentLayout'],
    }),
  ],
});
