import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getCurrentUserId,
  getIsLoggedIn,
  getUserById,
} from "../../store/users";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUser = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(currentUser));
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn || user.role !== "admin") {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRoute;
