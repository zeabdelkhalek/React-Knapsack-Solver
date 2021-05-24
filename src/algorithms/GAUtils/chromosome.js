class Chromosome {
  constructor(bag) {
    this.bag = bag;
    this.genes = []; // values of the gene (0,...1)
    this.items = bag.itemSet; // hold current items
    this.fitness = 0; // fitness of this gene
    this.totalWeight = 0; // total weight of gene
    this.totalBenefit = 0; // total benefits by this gene

    // generate this gene randomly
    for (var i = 0; i < this.items.length; i++) {
      this.genes[i] = Math.floor(Math.random() * 2); // Pick 0 or 1 randomly
    }
  }

  calculateFitness = () => {
    var totalBenefit = 0;
    var totalWeight = 0;

    for (var i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === 1) {
        totalWeight += this.items[i].weight;
        totalBenefit += this.items[i].value;
      }
    }

    // if the Weight is over remove random element
    while (totalWeight > this.bag.size) {
      var randomIndex = Math.floor(Math.random() * this.items.length);
      while (this.genes[randomIndex] === 0) {
        randomIndex = Math.floor(Math.random() * this.items.length);
      }
      // found element to delete, update gene
      this.genes[randomIndex] = 0;
      totalWeight -= this.items[randomIndex].weight;
      totalBenefit -= this.items[randomIndex].value;
    }
    // update gene totals
    this.totalWeight = totalWeight;
    this.totalBenefit = totalBenefit;
    // calculate final-fitness of the gene
    this.fitness = totalBenefit;
    return this.fitness;
  };

  // Crossover Random
  crossoverRandom = (partner) => {
    // A new child
    var child = new Chromosome(this.bag);
    // Pick a random midpoint cross over , Half from one, half from the other
    var midpoint = Math.floor(Math.random() * this.genes.length);

    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  };

  // uniform cross over
  crossoverUniform = (partner) => {
    // A new child
    var child = new Chromosome(this.bag);
    var mixingRatio = 0.5;
    // cross over , Half from one, half from the other
    for (var i = 0; i < this.genes.length; i++) {
      if (Math.random() < mixingRatio) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  };

  // Based on a mutation probability, picks a new random character
  mutate = (mutationRate) => {
    for (var i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        if ((this.genes[i] = 1)) {
          this.genes[i] = 0;
        } else {
          this.genes[i] = 1;
        }
      }
    }
  };
}

export default Chromosome;
