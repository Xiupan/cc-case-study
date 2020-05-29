import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const MyComponent = (props) => {
  const something = useSelector((state) => state.MyReducer.something);

  return (
    <React.Fragment>
      <p>{something}</p>
    </React.Fragment>
  );
};
