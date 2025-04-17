import { Lieu } from './classes.js'
import { Ingredients } from './classes.js'
import { Outils } from './classes.js'
import { Panier } from './classes.js'

//// Création de la sous-classe Epicerie ////

class Commerce extends Lieu {
    constructor(nom, personnes, paniers, ingredients) {
            super(nom,personnes);
            this.paniers = paniers;
            this.ingredients = ingredients;
    }
}

//// Ingrédients ////

let oignon = new Ingredients("oignon", ["entier"], 1)
let oeufs = new Ingredients("oeufs", ["entier", "entier", "entier"], 3)
let poivre = new Ingredients("poivre", ["entier"], 2)
let sel = new Ingredients("sel", ["entier"], 1.75)
let fromage = new Ingredients("fromage", ["rapé"], 3.5)
let ail = new Ingredients("ail", ["entier"], 0.5)

//// Objets "panier" ////

let panier1 = new Panier("panier 1", [])
let panier2 = new Panier("panier 2", [])
let panier3 = new Panier("panier 3", [])
let panier4 = new Panier("panier 4", [])
let panier5 = new Panier("panier 5", [])


//// Lieu - objet "maison" ////

let maison = new Lieu("maison", [])

//// Lieu - objet "épicerie" ////
let epicerie = new Commerce("épicerie", [], [panier1, panier2, panier3, panier4, panier5], [oignon, oeufs, poivre, sel, fromage, ail])


//// Personnage ////
let personnage = {
    nom : "Charles",
    lieuActuel : null,
    argent : 30,
    mainDroite : [],
    mainGauche : [],
    seDeplacer(lieu) {
        // si le personne est déjà quelque part, il faudra le retirer du lieu précédent et l'ajouter dans le nouveau lieu
        if (this.lieuActuel !== null) {
            let previous = this.lieuActuel // je stocke le lieu précédent
            previous.personnes = []
            this.lieuActuel = lieu
            lieu.personnes.push(personnage)
            console.log(`${personnage.nom} est actuellement à ${personnage.lieuActuel.nom}`)
        }
        // pour le départ : si le personnage ne se trouve nulle part, on lui ajoue un lieu et dans le lieu, le personnage est ajouté
        else if (this.lieuActuel == null) {
            this.lieuActuel = lieu
            lieu.personnes.push(personnage)
            console.log(`${personnage.nom} se trouve maintenant à ${personnage.lieuActuel.nom}`)
        }
    },
    payerArticle(article) {
        personnage.argent = personnage.argent - article.prix
    },
    couper(ingredients, outils) {} 
}


//// Création des 2 objets "outils" sur base de 2 sous-classes extended de la classe Outils ////

class Decoupe extends Outils {

    constructor(nom, action) {
        super(nom);
        this.action = action;
    }

}

class Cuisson extends Outils {

    constructor(nom,contenu) {
        super(nom);
        this.contenu = contenu;
    }

    // cuire() {
    //     setTimeout(() => {
    //         console.log("Delayed for 1 second.");
    //       }, 4000);
    //     }
    //l'élément dans la poele (le mélange) passe de l'état "cru" à "cuit"
}

let couteau = new Decoupe("couteau", "couper")
let poele = new Cuisson("poele", [])

//// Objet bol ////

let bol = {
    contenu : [],
    melanger(nomDuMelange){}
    // tous les ingredients contenus initialement dans "contenu" sont remplacer par l'objet "melange" ("omelette"), dont le prix est de zéro et l'état est "cru"
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// départ maison ////
personnage.seDeplacer(maison)

//// déplacement épicerie ////
personnage.seDeplacer(epicerie)
// met un panier randomly dans sa main droite
let r = Math.floor(Math.random() * epicerie.paniers.length)
personnage.mainDroite.push(epicerie.paniers[r])
epicerie.paniers.splice(r, 1)
// console.log(`${personnage.nom} a pris le ${epicerie.paniers[r].type}`)
console.log(`${personnage.nom} a pris un panier`)

//// copier chaque ingrédients de l'épicerie dans le contenu du panier tenu dans la main droite ////

// console.log(personnage.mainDroite[0].contenu)
// console.log(epicerie.ingredients.length)

let total = 0

for (let j=0 ; j < epicerie.ingredients.length ; j++) {
    personnage.mainDroite[0].contenu.push(epicerie.ingredients[j])
    personnage.payerArticle(epicerie.ingredients[j])
    console.log(`${personnage.nom} a pris le produit '${epicerie.ingredients[j].nom}'`)
    total = total + epicerie.ingredients[j].prix
}

console.log("/////////////////")
console.log("Ticket de caisse :")

for (let j=0 ; j < epicerie.ingredients.length ; j++) {
    console.log(`| ${epicerie.ingredients[j].nom} ...... ${epicerie.ingredients[j].prix} \u20AC`)
}

console.log("_________________")
console.log(`| TOTAL : ${total} \u20AC`)
console.log("/////////////////")
console.log(`Il paie. Il lui reste ${personnage.argent} \u20AC.`)

//// retourner à la maison ////

personnage.seDeplacer(maison)
console.log(`${personnage.nom} est rentré à ${personnage.lieuActuel.nom}`)

//// mettre chaque ingrédient contenu dans le panier tenu dans la main droite du personnage dans l'objet bol ////

