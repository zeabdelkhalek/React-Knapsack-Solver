function getRandomAsInt(min, max) {
  return Math.floor(Math.random() * (max - min) + +min);
}

const generateInitialSolution = (bag) => {
  const solution = [];
  const sortedItems = bag.itemSet.sort((a, b) => {
    const v1 = a.getItem().value / a.getItem().weight;
    const v2 = b.getItem().value / b.getItem().weight;
    return v1 - v2;
  });

  let remainingWeight = bag.size;

  for (let i = 0; i < sortedItems.length; i++) {
    const item = sortedItems[i];
    if (remainingWeight >= item.value) {
      solution.push(item);
      remainingWeight -= item.value;
    }
  }

  return solution;
};

const generateSolutionFromNeighbour = (bag, currentSolution) => {
  let modified = currentSolution.clone();
  let item = bag.getRandomItemFormItemSet(currentSolution);
  modified.push(item);
  while (bag.checkOverweight(modified)) {
    var dropIndex = getRandomAsInt(0, modified.length);
    modified.removeItem(dropIndex);
  }

  return modified;
};

const simulatedAnnealing = ({
  bag,
  start_temperature,
  end_temperature,
  cooling_factor,
  max_iterations_count,
}) => {
  var temperature = start_temperature;

  // generate random solution
  var current_solution = generateInitialSolution(bag);
  var best_solution = current_solution;

  while (temperature > end_temperature) {
    for (let i = 0; i < max_iterations_count; i++) {
      // choose neighbourhood solution
      var modifiedSolution = generateSolutionFromNeighbour(
        bag,
        current_solution
      );

      const current_profit = bag.getValueForList(current_solution);
      const neighbour_profit = bag.getValueForList(modifiedSolution);

      const delta = neighbour_profit - current_profit;

      if (delta > 0) {
        current_solution = modifiedSolution;
      } else {
        const v = Math.exp(delta / temperature);
        if (v >= Math.random()) {
          current_solution = modifiedSolution;
        }
      }

      if (
        bag.getValueForList(current_solution) >
        bag.getValueForList(best_solution)
      ) {
        best_solution = current_solution;
      }
    }
    temperature *= cooling_factor;
  }
  return best_solution;
};

export default simulatedAnnealing;
