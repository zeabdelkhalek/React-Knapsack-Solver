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
  crossover_type,
  cross_rate,
}) => {
  const nb_generations_history = [];
  var population = new Population(
    bag,
    mutation_rate,
    is_elitism,
    crossover_type,
    cross_rate
  );
  generateInitialPopulation(population, generation_size);
  population.calculateFitness();
  var nb_generations = 0;
  nb_generations_history.push(nb_generations);

  while (
    nb_generations < max_iterations_count &&
    !population.isNintyPercentTheSame()
  ) {
    population.generate();
    nb_generations++;
    nb_generations_history.push(nb_generations);
    population.calculateFitness();
    population.evaluate();
  }

  console.log("fiteness histiory", population.fitnessHistory);
  console.log("generations histiory", nb_generations_history);

  return {
    best: population.best,
    graphData: {
      fitnessHistory: population.fitnessHistory,
      nb_generations_history,
    },
  };
};

export default geneticAlgorithm;
