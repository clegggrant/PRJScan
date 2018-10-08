import { combineReducers } from "redux";

import persistDrawerReducer from "./persist-drawer_reducer";
import dashboardReducer from "./dashboard_reducer";

export default combineReducers({
  persistDrawerReducer,
  dashboardReducer
});