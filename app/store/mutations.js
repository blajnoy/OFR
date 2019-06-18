import * as types from './mutation-types';

export default {
  [types.INC_WINDOW](state, window) {
    state.windows.push(window);
  },
  [types.SET_CURRENT_LAYOUT](state, layout) {
    state.currentLayout = layout;
  },
  [types.INC_NEXT_WINDOW_INDEX](state, type) {
    if (state.layouts[type].cols * state.layouts[type].rows > state.layouts[type].nextIndex) {
      state.layouts[type].nextIndex += 1;
    } else {
      state.layouts[type].nextIndex = 1;
    }
  },
  [types.SET_NEXT_WINDOW_INDEX](state, { type, index }) {
    state.layouts[type].nextIndex = index;
  },
  [types.REMOVE_WINDOW](state, id) {
    state.windows = state.windows.filter(window => window.id !== id);
  },
};
