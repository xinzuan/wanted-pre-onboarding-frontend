import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props:any) => {
  // const isAuth  = false

  const token = localStorage.getItem("user");

  console.log("token", token);

  return <>{token ? <Route {...props} /> : <Redirect to="/signin" />}</>;
};

export default PrivateRoute;