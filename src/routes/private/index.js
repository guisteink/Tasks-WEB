import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import StoreContext from "../../store/context";
import isLogged from "../../utils/isLogged";

const RoutesPrivate = ({ component: Component, ...rest }) => {
  const { token } = useContext(StoreContext);
  return (
    <Route
      render={(...rest) =>
        isLogged ? (
          <Component {...rest}></Component>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    >{token}
    </Route>
  );
};

export default RoutesPrivate;
