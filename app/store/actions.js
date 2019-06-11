import * as types from './mutation-types';

export const setWindows = ({ commit }, payload) => {
  commit(types.UPDATE_WINDOWS, payload);
};
