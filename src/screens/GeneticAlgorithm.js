import React, { Component } from "react";
import { Button, Label, Input, Jumbotron } from "reactstrap";
import geneticAlgorithm from "../algorithms/genetic-algorithm";
import { Bag } from "../algorithms/knapsack";

class InputSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      max_weight: 11,
      max_iterations_count: 1000,
      generation_size: 200,
      mutation_rate: 0.01,
      is_elitism: false,
      dataset: [],
      bestSet: [],
      bestValue: null,
      bestWeight: null,
      duration: 0,
    };
  }

  onClick = () => {
    const {
      max_weight,
      max_iterations_count,
      generation_size,
      mutation_rate,
      dataset,
      is_elitism,
    } = this.state;

    console.log(dataset);
    var bag = new Bag(max_weight, dataset);

    let t0 = new Date().getTime();

    var solution = geneticAlgorithm({
      bag,
      max_iterations_count,
      generation_size,
      mutation_rate,
      is_elitism,
    });

    let t1 = new Date().getTime();

    this.setState({
      duration: t1 - t0,
    });

    console.log(solution);

    const bestSet = [];

    for (let i = 0; i < solution.genes.length; i++) {
      const gene = solution.genes[i];
      if (gene === 1) {
        bestSet.push(solution.items[i]);
      }
    }

    this.setState({
      bestSet,
      bestWeight: solution.totalWeight,
      bestValue: solution.totalBenefit,
    });
  };

  onChange = (type, e) => {
    let value = e.target.value;
    let dataset = [];
    if (type !== "input_file") {
      if (type === "is_elitism") {
        this.setState({ is_elitism: !this.state.is_elitism });
      } else {
        this.setState({ [type]: value });
      }
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
            <Label for="max_iterations_count">Nb Iterations</Label>
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
            <Label for="generation_size">Generation size</Label>
            <Input
              type="number"
              name="generation_size"
              id="generation_size"
              value={this.state.generation_size}
              onChange={this.onChange.bind(this, "generation_size")}
            />
          </div>
          <br />
          <div className="col">
            <Label for="mutation_rate">Mutation rate</Label>
            <Input
              type="number"
              name="mutation_rate"
              id="mutation_rate"
              value={this.state.mutation_rate}
              onChange={this.onChange.bind(this, "mutation_rate")}
            />
          </div>
          <br />
        </div>
        <br />
        <div className="row">
          <div className="col ml-4">
            <Input
              type="checkbox"
              name="is_elitism"
              id="is_elitism"
              value={this.state.is_elitism}
              onChange={this.onChange.bind(this, "is_elitism")}
            />
            <Label for="is_elitism">Use Elitism</Label>
          </div>
          <br />
        </div>
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
          <span>
            {this.state.bestSet.map((item, index) => {
              return (
                <a key={index} style={{ marginRight: "6%" }}>
                  {" "}
                  [Weight: {item.getItem().weight},Value: {item.getItem().value}
                  ]
                </a>
              );
            })}
          </span>
        </div>
        <br />
        <div>
          <h3>Duration: {this.state.duration} MS</h3>
        </div>
      </div>
    );
  }
}

class GeneticAlgorithm extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1 className="display-9 text-center">
            Knapsack Problem with Genetic Algorithm
          </h1>
        </Jumbotron>
        <InputSection />
      </div>
    );
  }
}

export default GeneticAlgorithm;
