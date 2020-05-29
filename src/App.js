import React from "react";
import { Provider } from "react-redux";
import createStore from "./store";
import { MyComponent } from "./components";

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
}

export default App;
