import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import GeneticAlgorithm from "./screens/GeneticAlgorithm";
import SimulatedAnnealing from "./screens/SimulatedAnnealing";
import DynamicProgramming from "./screens/DynamicProgramming";
import Greedy from "./screens/Greedy";
import Home from "./screens/Home";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

export default class App extends Component {
  render() {
    return (
      <Router>
        <ul className="nav nav-pills mb-2 p-2">
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/dynamic-programming"
            >
              Dynamic Programming
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/greedy">
              Greedy
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/hill-climbing"
            >
              Hill Climbing
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/simulated-annealing"
            >
              Simulated annealing
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/genetic-algorithm"
            >
              Genetic algorithm
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/dynamic-programming">
            <DynamicProgramming />
          </Route>
          <Route path="/greedy">
            <Greedy />
          </Route>
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
