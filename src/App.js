import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SimulatedAnnealing from "./screens/SimulatedAnnealing";
export default class App extends Component {
  render() {
    return (
      <Router>
        <Redirect from="/" to="simulated-annealing" />
        <Switch>
          <Route path="/simulated-annealing">
            <SimulatedAnnealing />
          </Route>
        </Switch>
      </Router>
    );
  }
}
