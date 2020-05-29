import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";

import map from "./reducers/Map";

const sagaMiddleware = createSagaMiddleware();

const suffixes = {
  "my-future-url-dev.com": "stg",
  "my-future-url.com": "production",
};

// eslint-disable-next-line no-restricted-globals
const clientEnv = suffixes[location.hostname] || "local";

let composeEnhancers;
if (clientEnv === "local") {
  composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;
} else {
  composeEnhancers = compose;
}

const reducers = combineReducers({
  map,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagas.forEach(sagaMiddleware.run);
  return store;
};
