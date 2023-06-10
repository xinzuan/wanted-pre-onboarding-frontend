import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/login.component";
import SignUp from './components/signup.component';
import Home from './components/home.component';
import PrivateRoute from './auth/private';
import { Provider as TodoProvider } from "./context/TodoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <TodoProvider>
          <PrivateRoute exact path="/todo" component={Home} />
        </TodoProvider>
      </Switch>
    </Router>
  );
}

export default App;
