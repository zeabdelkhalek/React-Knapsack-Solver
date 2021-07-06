export default function dynamicProgramming({ bag }) {
  let nbLignes = bag.itemSet.length;
  let nbColonnes = bag.size;

  const Objets = bag.itemSet;

  var Matrice = Array.from(Array(nbLignes + 1), () => Array(nbColonnes + 1));

  //Pour chaque poids j<PoidsMax on prend les i premiers objets dont la somme des poids ne dépasse pas j.

  for (var i = 0; i <= nbLignes; i++) {
    for (var j = 0; j <= nbColonnes; j++) {
      if (i == 0 || j == 0) {
        Matrice[i][j] = 0; //i=0 C’est à dire qu’on a aucun objet ou j=0 c’est à dire le poids maximal égale 0
      } else {
        if (Objets[i - 1].weight <= j) {
          Matrice[i][j] = Math.max(
            Matrice[i - 1][j],
            Objets[i - 1].value + Matrice[i - 1][j - Objets[i - 1].weight]
          ); //L’objet “i” est pris
        } else {
          Matrice[i][j] = Matrice[i - 1][j]; //L’objet “i” n’est pas pris
        }
      }
    }
  }

  let ObjetsChoisis = [];
  let poids = bag.size;
  let resultat = Matrice[nbLignes][nbColonnes];
  for (var i = nbLignes; i > 0 && resultat > 0; i--) {
    if (resultat != Matrice[i - 1][poids]) {
      ObjetsChoisis.push(Objets[i - 1]);
      resultat = resultat - Objets[i - 1].value;
      poids = poids - Objets[i - 1].weight;
    }
  }

  console.log("\nLes objets choisis sont : \n");
  console.log(ObjetsChoisis);

  return ObjetsChoisis;
}

export function dynamicProgrammingUKP({ bag }) {
  let PoidsMax = bag.size
  const Objets = bag.itemSet;

  let Vect = [PoidsMax + 1];
  let ObjetsChoisis = [PoidsMax + 1];

  for (let i = 0; i <= PoidsMax; i++) {
    Vect[i] = 0;
    ObjetsChoisis[i] = "";
  }
  for (let i = 0; i <= PoidsMax; i++) {
    for (let j = 0; j < Objets.length; j++) {
      if (Objets[j].weight <= i) {
        Vect[i] = Math.max(Vect[i], Vect[i - Objets[j].weight] + Objets[j].value);

        if (Vect[i - Objets[j].weight] + Objets[j].value >= Vect[i]) {
          ObjetsChoisis[i] =
            ObjetsChoisis[i - Objets[j].weight] + " " + Objets[j].index;
        }
      }
    }
  }

  console.log("\nLes objets choisis sont : \n");
  console.log(ObjetsChoisis);
  console.log(ObjetsChoisis[PoidsMax]);
  console.log(
    "\n--------------------------  Gain maximum = " +
      Vect[PoidsMax] +
      "  --------------------------\n"
  );

  const indexes = ObjetsChoisis[PoidsMax].split(" ")
  const itemSet = []

  for (let i = 1; i < indexes.length; i++) {
    const element = Number(indexes[i])
    const object = bag.itemSet.find(o => o.index === element)
    const index = itemSet.findIndex(item => item.index === object.index)
    if (index !== -1) {
      itemSet[index].count++
    } else {
      itemSet.push({
        ...object,
        count: 1
      })
    }
  }


  return { 
    itemSet,
    bestValue: Vect[PoidsMax],
  };
}

/************************************MAIN*********************************************/

// let PoidsMax = 5;
// let Objets = [
//   new objet("A", 2, 6),
//   new objet("B", 1, 2),
//   new objet("C", 1, 2),
//   new objet("D", 2, 6),
// ];
