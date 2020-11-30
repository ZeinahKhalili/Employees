import Register from "./pages/Register";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import Employees from "./pages/Employees/Employees";
import Login, { PrivateRoute } from "./pages/Login";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: { transform: "translateZ(0)" },
    },
  },
  shape: {
    borderRadius: "12px",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Register} />
        <PrivateRoute path="/employees" component={Employees} />
      </Switch>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
