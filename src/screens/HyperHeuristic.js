import React, { Component } from "react";
import { Button, Label, Input, Jumbotron, Badge } from "reactstrap";
import { Bag } from "../algorithms/knapsack";
import HyperHeuristicTabu from "../algorithms/hyper-heuristic";
import ObjectUI from "./ObjectUI";
import {
  totalValueGreedy,
  densityGreedy,
  weightGreedy,
  valueGreedy,
} from "../algorithms/greedy-ukp";

class InputSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      max_weight: 30,
      dataset: [],
      bestSet: [],
      bestValue: null,
      bestWeight: null,
      duration: 0,
      max_combination_length: 15,
      max_iterations: 100,
      max_no_change: 100,
    };
  }

  onClick = () => {
    const {
      max_weight,
      dataset,
      max_combination_length,
      max_iterations,
      max_no_change,
    } = this.state;

    console.log(dataset);
    var bag = new Bag(max_weight, dataset);

    let t0 = new Date().getTime();

    let hyper = new HyperHeuristicTabu({
      bag,
      max_combination_length,
      max_iterations,
      max_no_change,
    });

    var best = hyper.run();

    let t1 = new Date().getTime();

    this.setState({
      duration: t1 - t0,
    });

    console.log("best", best);

    this.setState({
      bestSet: best,
      bestWeight: best.reduce((acc, item) => acc + item.weight * item.count, 0),
      bestValue: best.reduce((acc, item) => acc + item.value * item.count, 0),
    });
  };

  onChange = (type, e) => {
    let value = e.target.value;
    let dataset = [];
    if (type !== "input_file") {
      this.setState({ [type]: value });
    } else {
      let file = e.target.files[0];

      if (file) {
        let reader = new FileReader();

        reader.onload = (e) => {
          var contents = e.target.result;

          dataset = contents
            .split("\n")
            .map((set) => set.split(",").map((y) => (y = parseInt(y))))
            // ignore columns names
            .slice(1);

          this.setState({ dataset: dataset });
        };

        reader.readAsText(file);
      }
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <Label for="max_weight">Max Weight</Label>
            <Input
              type="number"
              name="max_weight"
              id="max_weight"
              value={this.state.max_weight}
              onChange={this.onChange.bind(this, "max_weight")}
            />
          </div>
          <br />
          <div className="col">
            <Label for="File">Knapsack Items</Label>
            <Input
              type="file"
              name="file"
              id="File"
              onChange={this.onChange.bind(this, "input_file")}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <Label for="max_combination_length">Max combination length</Label>
            <Input
              type="number"
              name="max_combination_length"
              id="max_combination_length"
              value={this.state.max_combination_length}
              onChange={this.onChange.bind(this, "max_combination_length")}
            />
          </div>
          <br />
          <div className="col">
            <Label for="max_iterations">Max Iterations</Label>
            <Input
              type="number"
              name="max_iterations"
              id="max_iterations"
              value={this.state.max_iterations}
              onChange={this.onChange.bind(this, "max_iterations")}
            />
          </div>
          <br />
          <div className="col">
            <Label for="max_no_change">Max with no change</Label>
            <Input
              type="number"
              name="max_no_change"
              id="max_no_change"
              value={this.state.max_no_change}
              onChange={this.onChange.bind(this, "max_no_change")}
            />
          </div>
          <br />
        </div>
        <br />
        <Button
          color="primary"
          size="lg"
          block
          onClick={this.onClick.bind(this)}
          disabled={this.state.dataset.length === 0}
        >
          Calculate
        </Button>
        <br />
        <div>
          <h3>Best Value: {this.state.bestValue}</h3>
        </div>
        <div>
          <h3>Current weight: {this.state.bestWeight}</h3>
        </div>
        <div>
          <h3>Objects:</h3>
          {this.state.bestSet.map((item, index) => (
            <ObjectUI item={item} key={index} />
          ))}
        </div>
        <br />
        <div>
          <h3>Duration: {this.state.duration} MS</h3>
        </div>
      </div>
    );
  }
}

class HyperHeuristic extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1 className="display-9 text-center">
            Unbounded Knapsack Problem with Hyper Heuristic
          </h1>
        </Jumbotron>
        <InputSection />
      </div>
    );
  }
}

export default HyperHeuristic;
