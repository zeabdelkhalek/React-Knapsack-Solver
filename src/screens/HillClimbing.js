import React, { Component } from "react";
import { Button, Label, Input, Jumbotron, Badge } from "reactstrap";
import { Bag } from "../algorithms/knapsack";
import dynamicProgramming from "../algorithms/dynamic-programming";
import ObjectUI from "./ObjectUI";
import greedy from "../algorithms/greedy";
import hillClimbing from "../algorithms/hill-climbing";

class InputSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      max_weight: 10,
      dataset: [],
      bestSet: [],
      bestValue: null,
      bestWeight: null,
      duration: 0,
      max_iterations_count: 20,
      opt_val: 3000,
    };
  }

  onClick = () => {
    const { max_weight, dataset, max_iterations_count, opt_val } = this.state;

    console.log(dataset);
    var bag = new Bag(max_weight, dataset);

    let t0 = new Date().getTime();

    var best = hillClimbing(bag, max_iterations_count, opt_val);

    let t1 = new Date().getTime();

    this.setState({
      duration: t1 - t0,
    });

    this.setState({
      bestSet: best.selectedObjects,
      bestWeight: best.selectedObjects.reduce(
        (acc, item) => acc + item.weight,
        0
      ),
      bestValue: best.opt_value,
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
        </div>{" "}
        <br />
        <div className="row">
          <div className="col">
            <Label for="max_iterations_count">Max Iterations</Label>
            <Input
              type="number"
              name="max_iterations_count"
              id="max_iterations_count"
              value={this.state.max_iterations_count}
              onChange={this.onChange.bind(this, "max_iterations_count")}
            />
          </div>
          <br />
          <div className="col">
            <Label for="opt_val">OptVal</Label>
            <Input
              type="number"
              name="opt_val"
              id="opt_val"
              value={this.state.opt_val}
              onChange={this.onChange.bind(this, "opt_val")}
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
        </Button>{" "}
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

class HillClimbing extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1 className="display-9 text-center">
            Knapsack Problem with Hill Climbing heuristic
          </h1>
        </Jumbotron>
        <InputSection />
      </div>
    );
  }
}

export default HillClimbing;
