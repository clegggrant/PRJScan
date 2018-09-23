import { SET_IS_AUTHENTICATED } from "../actions/login_actions";

const initializedState = {
  isAuthenticated: false
};

const loginReducer = (state = initializedState, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.param };
    default:
      return state;
  }
};

export default loginReducer;