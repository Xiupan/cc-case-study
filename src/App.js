import React from "react";
import { Provider } from "react-redux";
import createStore from "./store";
import { RootComponent } from "./components";

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
}

export default App;
