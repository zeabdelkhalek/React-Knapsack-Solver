import React, { Component } from "react";
import { Button, Label, Input, Jumbotron, Badge } from "reactstrap";

export default class Homne extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1 className="display-9 text-center">
            Welcome To The Knapsack-Problem Sover
          </h1>
        </Jumbotron>
      </div>
    );
  }
}
