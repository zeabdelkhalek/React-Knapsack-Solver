function get_optimal_value_weight(capacity, weights, values) {
  var numItems = values.length,
    x = new Array(),
    maxi = 0,
    i = 0,
    j = 0,
    optimVal = 0,
    valWeight = [...Array(numItems)].map(() => Array(2).fill("0"));

  for (i = 0; i < numItems; i++) {
    valWeight[i][0] = weights[i];
    valWeight[i][1] = values[i];
  }
  weights.sort((a, b) => b[0] - a[0]);
  console.log(valWeight);
  for (i = 0; i < numItems; i++) {
    if (valWeight[i][0] <= capacity) {
      maxi += valWeight[i][0];
      capacity -= valWeight[i][0];
      optimVal += valWeight[i][1];
      x.push(values.indexOf(valWeight[i][1]) + 1);
    }
  }
  return [optimVal, x];
}

export default (bag) => {
  var capacity = bag.size;
  var values = bag.itemSet.map((item) => item.value);
  var weights = bag.itemSet.map((item) => item.weight);
  var [opt_value, objList] = get_optimal_value_weight(
    capacity,
    weights,
    values
  );

  const selectedObjects = [];
  for (let i = 0; i < objList.length; i++) {
    const index = objList[i] - 1;
    selectedObjects.push(bag.itemSet[index]);
  }
  return {
    opt_value,
    selectedObjects,
  };
};
