import { fill, includes, isEqual } from "lodash";
import { Add, Remove, Swap, Change } from "./movers";

var randomKey = function (obj) {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

const totalValue = (items, capacity) => {
  var tmp = new Array(items.length).fill(0);
  var sol = new Array(items.length).fill(0);
  var gain = 0;

  var remainingWeight = capacity;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    tmp[i] = item.value * Math.floor(remainingWeight / item.weight);
  }
  let indmax = tmp.indexOf(Math.max(...tmp));
  gain = tmp[indmax] + gain;
  if (sol[indmax] == 0) {
    sol[indmax] = Math.floor(remainingWeight / items[indmax].weight);
    if (sol[indmax] != 0) {
      return items[indmax];
    }
  }
};

const maxRatio = (items, capacity) => {
  const sortedItems = items.sort((a, b) => {
    const v1 = a.getItem().value / a.getItem().weight;
    const v2 = b.getItem().value / b.getItem().weight;
    return v2 - v1;
  });

  for (let i = 0; i < sortedItems.length; i++) {
    const element = sortedItems[i];
    if (element.weight <= capacity) return sortedItems[i];
  }
};

const minWeight = (items, capacity) => {
  const sortedItems = items.sort((a, b) => {
    const w1 = a.getItem().weight;
    const w2 = b.getItem().weight;
    return w1 - w2;
  });

  if (sortedItems[0].weight <= capacity) return sortedItems[0];
};

const maxValue = (items, capacity) => {
  const sortedItems = items.sort((a, b) => {
    const v1 = a.getItem().value;
    const v2 = b.getItem().value;
    return v2 - v1;
  });

  for (let i = 0; i < sortedItems.length; i++) {
    const element = sortedItems[i];
    if (element.weight <= capacity) return sortedItems[i];
  }
};

class HyperHeuristicTabu {
  constructor({
    bag,
    max_combination_length = 15,
    max_iterations = 100,
    max_no_change = 100,
  }) {
    this.heuristic_map = {
      t: totalValue,
      d: maxRatio,
      w: minWeight,
      v: maxValue,
    };
    this.MAX_COMBINATION_LENGTH = max_combination_length;
    this.MAX_ITERATIONS = max_iterations;
    this.MAX_NO_CHANGE = max_no_change;
    this.bag = bag;
    this.tabu_list = [];
    this.fitness = 0;
    this.capacity = bag.size;
    this.solution = null;
  }

  // run the hyper tabu
  run() {
    // generate initial combinaison X
    const randomLength = Math.floor(
      Math.random() * (this.MAX_COMBINATION_LENGTH - 6) + 6
    );
    var X = Array(randomLength);
    for (let i = 0; i < randomLength; i++) {
      X[i] = randomKey(this.heuristic_map);
    }
    X = X.join("");
    console.log("X", X);
    // generate initial solution from X
    this.solution = this.generateSolution(X);
    this.fitness = this.getValueForList(this.solution);
    this.tabu_list.push(X);
    var current_iteration = 0;
    var num_no_change = 0;

    while (
      num_no_change < this.MAX_NO_CHANGE &&
      current_iteration < this.MAX_ITERATIONS
    ) {
      // apply move operator
      var Y = this.applyMoveOperator(X);
      while (Y.length > this.MAX_COMBINATION_LENGTH) {
        Y = this.applyMoveOperator(Y);
      }
      if (!includes(this.tabu_list, Y)) {
        this.tabu_list.push(Y);
        let solution = this.generateSolution(Y);
        let fitness = this.getValueForList(solution);
        if (fitness > this.fitness) {
          this.fitness = fitness;
          this.solution = solution;
          num_no_change = 0;
          X = Y;
        }
        current_iteration += 1;
      } else {
        current_iteration += 1;
        num_no_change += 1;
      }
    }
    return this.solution;
  }

  // Generate solution from combination of heuristics
  generateSolution(pattern) {
    const solution = [];
    this.capacity = this.bag.size;
    const pattern_length = pattern.length;
    // for (let i = 0; i < this.bag.itemSet.length; i++) {
    for (let i = 0; i < pattern.length; i++) {
      //   const h = pattern[i % pattern_length];
      const h = pattern[i];
      const element = this.heuristic_map[h].call(
        this,
        this.bag.itemSet,
        this.capacity
      );
      if (element) {
        const index = solution.findIndex((o) => o.index === element.index);
        if (index === -1) {
          solution.push({
            ...element,
            count: 1,
          });
        } else {
          solution[index].count += 1;
        }
        this.capacity = this.capacity - element.weight;
      }
    }
    return solution;
  }

  applyMoveOperator(combinaison) {
    const movers = [Add, Remove, Swap, Change];
    const randomIndex = Math.floor(Math.random() * (movers.length - 0) + 0);
    return movers[randomIndex].call(
      this,
      combinaison,
      Object.keys(this.heuristic_map)
    );
  }

  getValueForList(itemSet) {
    return itemSet.reduce((acc, item) => acc + item.value * item.count, 0);
  }
}

export default HyperHeuristicTabu;
