import * as types from './mutation-types';

export const addWindow = ({ commit }, window) => {
  commit(types.INC_WINDOW, window);
};

export const removeWindow = ({ commit }, id) => {
  commit(types.REMOVE_WINDOW, id);
};

export const setCurrentLayout = ({ commit }, layout) => {
  commit(types.SET_CURRENT_LAYOUT, layout);
};

export const incNextWindowIndex = ({ commit }, type) => {
  commit(types.INC_NEXT_WINDOW_INDEX, type);
};

export const setNextWindowIndex = ({ commit }, type, index) => {
  commit(types.SET_NEXT_WINDOW_INDEX, { type, index });
};

export const pin = ({ commit }, id, status) => {
  commit(types.PIN, { id, status });
};

export const unpin = ({ commit }) => {
  commit(types.UNPIN);
};
