import { Lieu } from './classes.js'
import { Ingredients } from './classes.js'
import { Outils } from './classes.js'

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

//// Objet "panier" ////

let panier = {
    type : "panier",
    contenu : [],
}

//// Lieu - objet "maison" ////

let maison = new Lieu("maison", [])

//// Lieu - objet "épicerie" ////
let epicerie = new Commerce("épicerie", [], [panier], [oignon, oeufs, poivre, sel, fromage, ail])


//// Personnage ////
let personnage = {
    nom : "charles",
    lieuActuel : null,
    argent : null,
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
    payerArticle(article) {},
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


personnage.seDeplacer(maison)
