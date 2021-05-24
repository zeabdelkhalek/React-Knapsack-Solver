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

// function ProgDynam_avec_exemplaires() {
//   console.log(
//     "\n\n******************************  Programmation dynamique avec plusieurs instances:  ******************************\n"
//   );

//   let Vect = [PoidsMax + 1];
//   let ObjetsChoisis = [PoidsMax + 1];

//   for (i = 0; i <= PoidsMax; i++) {
//     Vect[i] = 0;
//     ObjetsChoisis[i] = "";
//   }
//   for (i = 0; i <= PoidsMax; i++) {
//     for (j = 0; j < Objets.length; j++) {
//       if (Objets[j].poids <= i) {
//         Vect[i] = Math.max(Vect[i], Vect[i - Objets[j].poids] + Objets[j].gain);

//         if (Vect[i - Objets[j].poids] + Objets[j].gain >= Vect[i]) {
//           ObjetsChoisis[i] =
//             ObjetsChoisis[i - Objets[j].poids] + " " + Objets[j].nom;
//         }
//       }
//     }
//   }
//   console.log(Vect);

//   for (i = 0; i < Vect.length; i++) {
//     console.log(Vect[i] + ":" + ObjetsChoisis[i]);
//   }

//   console.log("\nLes objets choisis sont : \n");
//   console.log(ObjetsChoisis[PoidsMax]);
//   console.log(
//     "\n--------------------------  Gain maximum = " +
//       Vect[PoidsMax] +
//       "  --------------------------\n"
//   );
// }

/************************************MAIN*********************************************/

// let PoidsMax = 5;
// let Objets = [
//   new objet("A", 2, 6),
//   new objet("B", 1, 2),
//   new objet("C", 1, 2),
//   new objet("D", 2, 6),
// ];
