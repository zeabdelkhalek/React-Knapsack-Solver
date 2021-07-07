const Add = (combinaison, keys) => {
  let new_combinaison = combinaison;
  const num_inserts = Math.floor(Math.random() * (combinaison.length - 1) + 1);
  for (let i = 0; i < num_inserts; i++) {
    const to_insert = Math.floor(Math.random() * (combinaison.length - 0) + 0);
    new_combinaison =
      combinaison.slice(0, to_insert) +
      keys[(keys.length * Math.random()) << 0] +
      combinaison.slice(to_insert);
  }
  return new_combinaison;
};

const Remove = (combinaison, keys) => {
  let new_combinaison = combinaison;
  const num_removals = Math.floor(Math.random() * (combinaison.length - 0) + 0);
  for (let i = 0; i < num_removals; i++) {
    const to_remove = Math.floor(Math.random() * (combinaison.length - 0) + 0);
    new_combinaison =
      combinaison.slice(0, to_remove) + combinaison.slice(to_remove + 1);
  }
  return new_combinaison;
};

const Swap = (combinaison, keys) => {
  let new_combinaison = combinaison;
  const num_swaps = Math.floor(Math.random() * (combinaison.length - 0) + 0);
  for (let i = 0; i < num_swaps; i++) {
    const idx1 = Math.floor(Math.random() * (combinaison.length - 0) + 0);
    const idx2 = Math.floor(Math.random() * (combinaison.length - 0) + 0);
    var arr = new_combinaison.split("");
    var tmp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = tmp;
    new_combinaison = arr.join("");
  }
  return new_combinaison;
};

const Change = (combinaison, keys) => {
  let new_combinaison = combinaison;
  const num_changes = Math.floor(Math.random() * (combinaison.length - 1) + 1);
  for (let i = 0; i < num_changes; i++) {
    const to_change = Math.floor(Math.random() * (combinaison.length - 0) + 0);
    new_combinaison =
      new_combinaison.substring(0, to_change) +
      keys[(keys.length * Math.random()) << 0] +
      new_combinaison.substring(to_change + 1);
  }
  return new_combinaison;
};

export { Add, Remove, Swap, Change };
