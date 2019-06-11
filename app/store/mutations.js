import * as types from './mutation-types';

export default {
  [types.UPDATE_WINDOWS](state, payload) {
    state.windows = payload;
  },
};
