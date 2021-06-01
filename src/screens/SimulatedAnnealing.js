import React, { Component } from "react";
import { Button, Label, Input, Jumbotron, Badge } from "reactstrap";
import { Bag } from "../algorithms/knapsack";
import simulatedAnnealing from "../algorithms/simulated-annealing";
import ObjectUI from "./ObjectUI";
import Chart from "react-apexcharts";
import { graphOptions } from "./graphOptions";

class InputSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      max_weight: 1000000,
      start_temperature: 1000,
      end_temperature: 50,
      max_iterations_count: 90,
      cooling_factor: 0.7,
      initial_solution_method: "Random",
      dataset: [],
      bestSet: [],
      bestValue: null,
      bestWeight: null,
      duration: 0,
      graphData: null,
    };
  }

  onClick = () => {
    const {
      cooling_factor,
      start_temperature,
      end_temperature,
      max_weight,
      max_iterations_count,
      dataset,
      initial_solution_method,
    } = this.state;

    console.log(dataset);
    var bag = new Bag(max_weight, dataset);

    let t0 = new Date().getTime();

    var { best, graphData } = simulatedAnnealing({
      bag,
      start_temperature,
      end_temperature,
      cooling_factor,
      max_iterations_count,
      initial_solution_method,
    });

    let t1 = new Date().getTime();

    this.setState({
      duration: t1 - t0,
      graphData,
    });

    let bestSolution = bag.printSolution(best);
    console.log("bestSolution", bestSolution);

    this.setState({
      bestSet: bestSolution.itemSet,
      bestWeight: bestSolution.itemSet.reduce(
        (acc, item) => acc + item.weight,
        0
      ),
      bestValue: bestSolution.bestValue,
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
    const { graphData } = this.state;
    var series = [];

    if (graphData) {
      series = [
        {
          name: "Sack Value",
          data: graphData.valueHistory.map((value, index) => {
            return {
              x: graphData.temeratureHistory[index],
              y: value,
            };
          }),
        },
      ];
    }
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
            <Label for="start_temperature">Temperature Initiale</Label>
            <Input
              type="number"
              name="start_temperature"
              id="start_temperature"
              value={this.state.start_temperature}
              onChange={this.onChange.bind(this, "start_temperature")}
            />
          </div>
          <br />
          <div className="col">
            <Label for="end_temperature">Temperature Finale</Label>
            <Input
              type="number"
              name="end_temperature"
              id="end_temperature"
              value={this.state.end_temperature}
              onChange={this.onChange.bind(this, "end_temperature")}
            />
          </div>
          <br />
          <div className="col">
            <Label for="max_iterations_count">Sampling size</Label>
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
            <Label for="cooling_factor">Cooling Factor</Label>
            <Input
              type="number"
              name="cooling_factor"
              id="cooling_factor"
              value={this.state.cooling_factor}
              onChange={this.onChange.bind(this, "cooling_factor")}
            />
          </div>
          <br />
          <div className="col">
            <Label for="initial_solution_method">Initial solution method</Label>
            <Input
              type="select"
              name="initial_solution_method"
              id="initial_solution_method"
              value={this.state.initial_solution_method}
              onChange={this.onChange.bind(this, "initial_solution_method")}
            >
              <option>Random</option>
              <option>Greedy</option>
            </Input>
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
        <div className="mt-4">
          {graphData && (
            <Chart
              type="area"
              width="1000"
              series={series}
              options={{
                ...graphOptions,
                title: {
                  ...graphOptions.title,
                  text: "The progress of solution value through temeprature changes",
                },
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

class SimulatedAnnealing extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1 className="display-9 text-center">
            Knapsack Problem with Simulated Annealing
          </h1>
        </Jumbotron>
        <InputSection />
      </div>
    );
  }
}

export default SimulatedAnnealing;
