class Item {
  constructor(w, v, index) {
    this.weight = w;
    this.value = v;
    this.index = index;
  }

  getItem = () => {
    return {
      weight: this.weight,
      value: this.value,
      index: this.index,
    };
  };
}

class Bag {
  constructor(size, dataset) {
    this.size = size;
    this.itemSet = [];
    this.currentSolution = [];

    for (let i = 0; i < dataset.length; i++) {
      var item = new Item(dataset[i][0], dataset[i][1], i);
      this.itemSet.push(item);
    }
  }

  getItemBasedOnIndex = (itemSet, index) => {
    return itemSet.find((item) => item.index === index);
  };

  getWeightForList = (itemSet) => {
    return itemSet.reduce((acc, item) => acc + item.weight, 0);
  };

  getValueForList = (itemSet) => {
    return itemSet.reduce((acc, item) => acc + item.value, 0);
  };

  checkOverweight = (itemSet) => {
    if (this.getWeightForList(itemSet) > this.size) return true;
    else return false;
  };

  getRandomItemFormItemSet = (currentSolution) => {
    let temp = getRandomAsInt(0, this.itemSet.length);
    let item = this.getItemBasedOnIndex(this.itemSet, temp);

    while (this.getItemBasedOnIndex(currentSolution, temp) != null) {
      temp = getRandomAsInt(0, this.itemSet.length);
      item = this.getItemBasedOnIndex(this.itemSet, temp);
    }

    return item;
  };

  calculateRemainingSpace = (itemSet) => {
    return this.size - this.getValueForList(itemSet);
  };

  printSolution = (itemSet) => {
    return {
      bestValue: this.getValueForList(itemSet),
      itemSet: itemSet,
    };
  };
}

function getRandomAsInt(min, max) {
  return Math.floor(Math.random() * (max - min) + +min);
}

Array.prototype.clone = function () {
  return this.slice(0);
};

Array.prototype.removeItem = function (index) {
  var i = 0;
  while (i < this.length) {
    if (i === index) {
      this.splice(i, 1);
    }
    i++;
  }
};

export { Bag, Item };
