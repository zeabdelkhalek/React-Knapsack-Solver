import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GeneticAlgorithm from "./screens/GeneticAlgorithm";
import SimulatedAnnealing from "./screens/SimulatedAnnealing";
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/simulated-annealing">
            <SimulatedAnnealing />
          </Route>
          <Route path="/genetic-algorithm">
            <GeneticAlgorithm />
          </Route>
        </Switch>
      </Router>
    );
  }
}
