import React from 'react';

import thunkMiddleware from 'redux-thunk'
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./redux/combine";

import Main from "./comps/Main";

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);

export default class App extends React.Component {
    render() {
       return (
        <Provider store={store}>
          <Main />
        </Provider>
    );   
  }
}

