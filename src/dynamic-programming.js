class objet {
  nom;
  poids;
  gain;
  constructor(nom, poids, gain) {
    this.nom = nom;
    this.poids = poids;
    this.gain = gain;
  }
}

function ProgDynam_sans_exemplaires() {
  console.log(
    "\n******************************  Programmation dynamique avec une seule instance:  ******************************\n"
  );

  let nbLignes = Objets.length;
  let nbColonnes = PoidsMax;

  var Matrice = Array.from(Array(nbLignes + 1), () => Array(nbColonnes + 1));

  //Pour chaque poids j<PoidsMax on prend les i premiers objets dont la somme des poids ne dépasse pas j.

  for (i = 0; i <= nbLignes; i++) {
    for (j = 0; j <= nbColonnes; j++) {
      if (i == 0 || j == 0) {
        Matrice[i][j] = 0; //i=0 C’est à dire qu’on a aucun objet ou j=0 c’est à dire le poids maximal égale 0
      } else {
        if (Objets[i - 1].poids <= j) {
          Matrice[i][j] = Math.max(
            Matrice[i - 1][j],
            Objets[i - 1].gain + Matrice[i - 1][j - Objets[i - 1].poids]
          ); //L’objet “i” est pris
        } else {
          Matrice[i][j] = Matrice[i - 1][j]; //L’objet “i” n’est pas pris
        }
      }
    }
  }

  let ObjetsChoisis = [];
  let poids = PoidsMax;
  let resultat = Matrice[nbLignes][nbColonnes];
  for (i = nbLignes; i > 0 && resultat > 0; i--) {
    if (resultat != Matrice[i - 1][poids]) {
      ObjetsChoisis.push(Objets[i - 1]);
      resultat = resultat - Objets[i - 1].gain;
      poids = poids - Objets[i - 1].poids;
    }
  }

  console.log(Matrice);
  console.log("\nLes objets choisis sont : \n");
  console.log(ObjetsChoisis);

  console.log(
    "\n--------------------------  Gain maximum = " +
      Matrice[nbLignes][nbColonnes] +
      "  --------------------------\n"
  );
}

function ProgDynam_avec_exemplaires() {
  console.log(
    "\n\n******************************  Programmation dynamique avec plusieurs instances:  ******************************\n"
  );

  let Vect = [PoidsMax + 1];
  let ObjetsChoisis = [PoidsMax + 1];

  for (i = 0; i <= PoidsMax; i++) {
    Vect[i] = 0;
    ObjetsChoisis[i] = "";
  }
  for (i = 0; i <= PoidsMax; i++) {
    for (j = 0; j < Objets.length; j++) {
      if (Objets[j].poids <= i) {
        Vect[i] = Math.max(Vect[i], Vect[i - Objets[j].poids] + Objets[j].gain);

        if (Vect[i - Objets[j].poids] + Objets[j].gain >= Vect[i]) {
          ObjetsChoisis[i] =
            ObjetsChoisis[i - Objets[j].poids] + " " + Objets[j].nom;
        }
      }
    }
  }
  console.log(Vect);

  for (i = 0; i < Vect.length; i++) {
    console.log(Vect[i] + ":" + ObjetsChoisis[i]);
  }

  console.log("\nLes objets choisis sont : \n");
  console.log(ObjetsChoisis[PoidsMax]);
  console.log(
    "\n--------------------------  Gain maximum = " +
      Vect[PoidsMax] +
      "  --------------------------\n"
  );
}

function LireFichier() {
  let xlsx = require("xlsx");
  let workbook = xlsx.readFile("small.xlsx");
  let sheet_name_list = workbook.SheetNames;
  let xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  //console.log(xlData);
  xlData.forEach((e) => Objets.push(new objet("OBJ", e.poids, e.gain)));
}

/************************************MAIN*********************************************/

let PoidsMax = 5;
let Objets = [
  new objet("A", 2, 6),
  new objet("B", 1, 2),
  new objet("C", 1, 2),
  new objet("D", 2, 6),
];

//LireFichier();

const { performance } = require("perf_hooks");
let t0 = performance.now();
ProgDynam_sans_exemplaires();
let t1 = performance.now();

console.log(
  "Programmation dynamique avec un seule instance prends " +
    (t1 - t0) +
    " milliseconds."
);

let t2 = performance.now();
ProgDynam_avec_exemplaires();
let t3 = performance.now();

console.log(
  "Programmation dynamique avec plusieurs instances prends " +
    (t3 - t2) +
    " milliseconds."
);
