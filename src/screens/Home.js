import React, { Component } from "react";
import { Button, Label, Input, Jumbotron, Badge } from "reactstrap";

export default class Homne extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">Welcome To The Knapsack-Problem Solver</h1>
          <p class="lead">
            Resolving the Knapsack Problem using Dynamic Programming, Heuristics
            & Meta heuristics, By: <br />
          </p>
          <p>
            - Abdelkhalek Zellat <br />
            - Oulahcene Abdelhadi <br />
            - Anis Chebah <br />
          </p>
          <img
            height="400"
            src="https://miro.medium.com/max/4298/1*4b1qYRRYPnPvOhT5UIYP1g.png"
          />
        </Jumbotron>
      </div>
    );
  }
}
