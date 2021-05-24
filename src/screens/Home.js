import React, { Component } from "react";
import { Button, Label, Input, Jumbotron, Badge } from "reactstrap";

export default class Homne extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">Welcome To The Knapsack-Problem Solver</h1>
          <p class="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <img
            height="500"
            src="https://miro.medium.com/max/4298/1*4b1qYRRYPnPvOhT5UIYP1g.png"
          />
        </Jumbotron>
      </div>
    );
  }
}
