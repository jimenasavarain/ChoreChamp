//combine all the reducers
import { combineReducers } from 'redux'
import { Page } from "./reducers";
//import {Reducers} from "./ReducersFile";

const myApp = combineReducers({
  //Reducers
  Page
});

export default myApp;