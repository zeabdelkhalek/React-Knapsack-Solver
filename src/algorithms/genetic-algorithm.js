import Chromosome from "./GAUtils/chromosome";
import Population from "./GAUtils/population";

const generateInitialPopulation = (population, generation_size) => {
  for (var i = 0; i < generation_size; i++) {
    population.population[i] = new Chromosome(population.bag);
  }
};

const geneticAlgorithm = ({
  bag,
  max_iterations_count,
  is_elitism,
  mutation_rate,
  generation_size,
}) => {
  console.log("is_elitism", is_elitism);
  var population = new Population(bag, mutation_rate, is_elitism);
  generateInitialPopulation(population, generation_size);
  population.calculateFitness();
  var nb_generations = 0;
  while (
    nb_generations < max_iterations_count &&
    !population.isNintyPercentTheSame()
  ) {
    population.generate();
    nb_generations++;
    population.calculateFitness();
    population.evaluate();
  }
  console.log(nb_generations);
  return population.best;
};

export default geneticAlgorithm;
