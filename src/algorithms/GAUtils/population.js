class Population {
  constructor(bag, mutation_rate, is_elitism, crossover_type) {
    this.population = []; // Array to hold the current population
    this.mutationRate = mutation_rate;
    this.isElitism = is_elitism;
    this.crossoverType = crossover_type;
    this.bag = bag;
    this.totalBenefit = 0;
    this.best = null;
    this.secondBest = null;
    this.fitnessHistory = [];
  }

  // Fill our fitness array with a value for every member of the population
  calculateFitness = () => {
    this.totalBenefit = 0;
    for (var i = 0; i < this.population.length; i++) {
      var benefet = this.population[i].calculateFitness();
      this.totalBenefit += benefet;
    }
    // save fiteness history to draw the graph
    this.fitnessHistory.push(this.totalBenefit);
  };

  // select a random parent randomly
  naturalSelection = () => {
    var rand = Math.random() * this.totalBenefit;
    for (var i = 0; i < this.population.length; i++) {
      var chromosome = this.population[i];
      if (rand < chromosome.fitness) {
        return chromosome;
      }
      rand -= chromosome.fitness;
    }
  };

  generate = () => {
    var newPopulation = [];
    var i = 0;
    // if Elitism is enabled
    if (this.isElitism && this.best && this.secondBest) {
      newPopulation.push(this.best);
      newPopulation.push(this.secondBest);
      i = 2;
    }
    // Refill the population with children from the mating pool
    for (; i < this.population.length; i++) {
      var partnerA = this.naturalSelection();
      var partnerB = this.naturalSelection();
      // do cross over
      var child =
        this.crossoverType === "Uniform"
          ? partnerA.crossoverUniform(partnerB)
          : partnerA.crossoverRandom(partnerB);
      // do mutation
      child.mutate(this.mutationRate);
      // add obtained child
      newPopulation[i] = child;
    }
    // update the new generation
    this.population = newPopulation;
  };

  isNintyPercentTheSame = () => {
    var arr = this.population;
    var dupsCount = {};
    var nintyPercentCount = arr.length * 0.9;

    for (var i = 0; i < arr.length; i++) {
      if (typeof dupsCount[arr[i].fitness] === "undefined") {
        dupsCount[arr[i].fitness] = 0;
      } else {
        dupsCount[arr[i].fitness]++;
      }
    }

    for (var key in dupsCount) {
      if (dupsCount[key] > nintyPercentCount) {
        return true;
      }
    }
    return false;
  };

  evaluate = () => {
    var worldrecord1 = 0;
    var worldrecord2 = 0;
    var index1 = 0;
    var index2 = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord1) {
        worldrecord2 = worldrecord1;
        index2 = index1;
        index1 = i;
        worldrecord1 = this.population[i].fitness;
      } else if (this.population[i].fitness > worldrecord2) {
        index2 = i;
        worldrecord2 = this.population[i].fitness;
      }
    }
    this.best = this.population[index1];
    this.secondBest = this.population[index2];
  };
}

export default Population;
