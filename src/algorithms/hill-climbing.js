/* eslint-disable no-undef */

// This is the function that returns an initial random solution .
function initial_solution(capacity, weights) {
  var randNum = 0,
    i = 0,
    temp_capacity = capacity,
    min = Math.min(...weights),
    size = weights.length,
    maxWeight = 0,
    randList = [], // list of used random numbers.
    x = new Array(size).fill(0); // The list of selected objects : if x[i]==1 then the object is selected .
  for (i = 0; i < size; i++) {
    // we have used a for loop to avoid an infinite loop .
    randNum = randomness(size);
    if (weights[randNum] <= temp_capacity && !randList.includes(randNum)) {
      // The random number mustn't be used before in the loop .
      randList.push(randNum);
      x[randNum] = 1;
      maxWeight += weights[randNum];
      temp_capacity -= weights[randNum];
    }
    if (temp_capacity == 0 || temp_capacity < min) break; // to avoid useless loops .
  }

  return randList;
}
/******************************************************************************************************************************************/
function randomness(maxVal) {
  return Math.floor(Math.random() * maxVal);
}
/******************************************************************************************************************************************/
function evaluate(values, objects) {
  var value = 0,
    i = 0,
    size = objects.length;
  for (i = 0; i < size; i++) {
    value += values[objects[i]];
  }

  return value;
}
/*****************************************************************************************************************************************/
function test_weight(weights, capacity, objects) {
  var i = 0,
    size = objects.length,
    weight = 0;
  for (i = 0; i < size; i++) {
    weight += weights[objects[i]];
  }
  if (weight <= capacity) return true;
  else return false;
}
/*****************************************************************************************************************************************/
function hillclimbing(optVal, maxIter, values, weights, capacity) {
  console.log("max_iterations_count", maxIter);
  var iniSol = [],
    round = 0,
    val = 0, // The value of the solution in each iteration .
    i = 0,
    size = values.length,
    boolean = 0,
    iniSol = initial_solution(capacity, weights),
    tempSol = Array.from(iniSol),
    save_sol = Array.from(tempSol),
    hillSol = [], // used to save the new best solution.
    //save_i = 10000000,  // used to save the last item changed.
    temp_max = evaluate(values, iniSol); // to save the initial solution for further modifications(next loops).
  console.log(
    "The initial solution is : [" +
      iniSol +
      "] and its initial value is : " +
      temp_max +
      "\n"
  );
  while (round < maxIter) {
    // delete the object instance and try to improve the solution by the for loop ;
    for (i = 0; i < size; i++) {
      if (!tempSol.includes(i)) {
        tempSol[round] = i;
        if (test_weight(weights, capacity, tempSol)) {
          val = evaluate(values, tempSol);
          if (val > temp_max) {
            boolean = 1;
            save_sol = Array.from(tempSol);
            temp_max = val;
          }
        }
      }
    }
    console.log(
      " the " +
        round +
        " solution is [" +
        save_sol +
        "] and it's value is " +
        temp_max +
        "\n"
    );

    if (optVal == temp_max) {
      hillSol = Array.from(save_sol);
      return hillSol;
    } else {
      if (boolean == 1) {
        iniSol = Array.from(save_sol);
      }
      tempSol = Array.from(iniSol);
      hillSol = Array.from(save_sol);
      round++;
    }
  }
  return hillSol;
}

export default (bag, max_iterations_count, opt_val) => {
  var capacity = bag.size;
  var values = bag.itemSet.map((item) => item.value);
  var weights = bag.itemSet.map((item) => item.weight);
  var hill = hillclimbing(
    opt_val,
    max_iterations_count,
    values,
    weights,
    capacity
  );

  console.log("hill", hill);

  const selectedObjects = [];
  for (let i = 0; i < hill.length; i++) {
    const index = hill[i];
    selectedObjects.push(bag.itemSet[index]);
  }

  return {
    opt_value: evaluate(values, hill),
    selectedObjects,
  };
};
