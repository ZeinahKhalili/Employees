import { Redirect, Route } from "react-router-dom";
import * as userService from "../services/userService";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userService.auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
export default PrivateRoute;
