import { SET_DRAWER_OPEN } from "../actions/persist-drawer_actions";

const initializedState = {
  open: false
};

const persistDrawerReducer = (state = initializedState, action) => {
  switch (action.type) {
    case SET_DRAWER_OPEN:
      return { ...state, open: action.param };
    default:
      return state;
  }
};

export default persistDrawerReducer;