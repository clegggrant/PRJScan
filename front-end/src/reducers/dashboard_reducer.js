import { SET_PLAINTEXT } from "../actions/dashboard_actions";

const initializedState = {
  plaintext: "test"
};

const dashboardReducer = (state = initializedState, action) => {
  switch (action.type) {
    case SET_PLAINTEXT:
      return { ...state, open: action.param };
    default:
      return state;
  }
};

export default dashboardReducer;