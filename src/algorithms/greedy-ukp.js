export const densityGreedy = (bag) => {
  const solution = [];

  const sortedItems = bag.itemSet.sort((a, b) => {
    const v1 = a.getItem().value / a.getItem().weight;
    const v2 = b.getItem().value / b.getItem().weight;
    return v2 - v1;
  });

  let remainingWeight = bag.size;
  const x1 = Math.floor(remainingWeight / sortedItems[0].weight);
  solution.push({
    ...sortedItems[0],
    count: x1,
  });

  remainingWeight = remainingWeight - x1 * sortedItems[0].weight;

  for (let i = 1; i < sortedItems.length; i++) {
    const item = sortedItems[i];
    let xi = Math.floor(remainingWeight / item.weight);
    if (xi > 0) {
      solution.push({
        ...item,
        count: xi,
      });
      remainingWeight = remainingWeight - xi * item.weight;
    }
  }

  return solution;
};

export const weightGreedy = (bag) => {
  const solution = [];

  const sortedItems = bag.itemSet.sort((a, b) => {
    const w1 = a.getItem().weight;
    const w2 = b.getItem().weight;
    return w1 - w2;
  });

  console.log("sorted items", sortedItems);

  let remainingWeight = bag.size;
  const x1 = Math.floor(remainingWeight / sortedItems[0].weight);
  solution.push({
    ...sortedItems[0],
    count: x1,
  });

  return solution;
};

export const valueGreedy = (bag) => {
  const solution = [];

  const sortedItems = bag.itemSet.sort((a, b) => {
    const v1 = a.getItem().value;
    const v2 = b.getItem().value;
    return v2 - v1;
  });

  console.log("sorted items", sortedItems);

  let remainingWeight = bag.size;
  const x1 = Math.floor(remainingWeight / sortedItems[0].weight);
  solution.push({
    ...sortedItems[0],
    count: x1,
  });

  remainingWeight = remainingWeight - x1 * sortedItems[0].weight;

  for (let i = 1; i < sortedItems.length; i++) {
    const item = sortedItems[i];
    let xi = Math.floor(remainingWeight / item.weight);
    if (xi > 0) {
      solution.push({
        ...item,
        count: xi,
      });
      remainingWeight = remainingWeight - xi * item.weight;
    }
  }

  return solution;
};
