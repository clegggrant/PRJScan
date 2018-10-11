import { SET_PLAINTEXT } from "../actions/dashboard_actions";

const initializedState = {
  plaintext: ""
};

const dashboardReducer = (state = initializedState, action) => {
  switch (action.type) {
    case SET_PLAINTEXT:
      return { ...state, plaintext: action.param };
    default:
      return state;
  }
};

export default dashboardReducer;