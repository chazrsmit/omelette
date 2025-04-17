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
            console.log("🛣️⠂⠄⠄⠂⠁⠁⠂⠄⠄🚗")
            console.log(`📍 ${personnage.nom} est maintenant à ${personnage.lieuActuel.nom}.`)
        }
        // pour le départ : si le personnage ne se trouve nulle part, on lui ajoue un lieu et dans le lieu, le personnage est ajouté
        else if (this.lieuActuel == null) {
            this.lieuActuel = lieu
            lieu.personnes.push(personnage)
            console.log(`📍 ${personnage.nom} se trouve actuellement à ${personnage.lieuActuel.nom}.`)
        }
    },
    payerArticle(article) {
        personnage.argent = personnage.argent - article.prix
    },
    couper(ingredients) {
        ingredients.etats = "coupé"
    } 
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

    cuire() {
        setTimeout(() => {
            this.contenu[0].etats = ["cuit"]
            console.log(`Notre ${this.contenu[0].nom} est cuite !`)
            console.log(poele.contenu[0])
            console.log(`🍽️ ${personnage.nom} peut enfin manger !`)
          }, 4000);
        }
    // l'élément dans la poele (le mélange) passe de l'état "cru" à "cuit"
}

let couteau = new Decoupe("couteau", "couper")
let poele = new Cuisson("poele", [])

//// Objet bol ////

let bol = {
    contenu : [],
    melanger(nomDuMelange){
        bol.contenu = [nomDuMelange]
    }
    // tous les ingredients contenus initialement dans "contenu" sont remplacer par l'objet "melange" ("omelette"), dont le prix est de zéro et l'état est "cru"
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// START départ maison ////

console.log("START")
console.log("────────────────────────")
personnage.seDeplacer(maison)
console.log(`🤤 ${personnage.nom} a faim. Il va faire des courses pour se faire à manger.`)

//// déplacement épicerie ////
console.log("────────────────────────")
personnage.seDeplacer(epicerie)

// si le perso a quelque chose dans sa main droite et rien dans sa main gauche :
if (personnage.mainDroite.length > 0 && personnage.mainGauche.length == 0) {
    for (let i = 0 ; i < personnage.mainDroite.length ; i++) {
    var panierARendre = personnage.mainDroite[i]
    epicerie.paniers.push(personnage.mainDroite[i])
    // on prend ce qu'il a dans la main droite et on le met dans la collection de paniers du magasin
    personnage.mainDroite.slice(i+1)
    // on retire de la main droite l'élément question
    var main = personnage.mainDroite.slice(i+1)
    // comme l'array originale n'est pas modifiée, on crée une nouvelle variable
    }
}

// si le personnage n'a rien dans sa main droite ni gauche
else if (personnage.mainDroite.length == 0 && personnage.mainGauche.length == 0) {
    // met un panier randomly dans sa main droite
    let r = Math.floor(Math.random() * epicerie.paniers.length)
    personnage.mainDroite.push(epicerie.paniers[r])
    var panierPris = epicerie.paniers[r]
    epicerie.paniers.splice(r, 1)
    console.log(`🧺 ${personnage.nom} prend le ${panierPris.type}.`)
    // console.log(`${personnage.nom} a pris un panier`)
}


//// copier chaque ingrédients de l'épicerie dans le contenu du panier tenu dans la main droite ////

// console.log(personnage.mainDroite[0].contenu)
// console.log(epicerie.ingredients.length)

let total = 0

for (let j=0 ; j < epicerie.ingredients.length ; j++) {
    personnage.mainDroite[0].contenu.push(epicerie.ingredients[j])
    personnage.payerArticle(epicerie.ingredients[j])
    total = total + epicerie.ingredients[j].prix
    // console.log(`🐧 ${personnage.nom} a pris le produit '${epicerie.ingredients[j].nom}'`)
    if (epicerie.ingredients[j].nom == 'ail') {
        console.log(`🧄 ${personnage.nom} met le produit '${epicerie.ingredients[j].nom}' dans son panier.`)
    }
    else if (epicerie.ingredients[j].nom == 'oignon') {
        console.log(`🧅 ${personnage.nom} met le produit '${epicerie.ingredients[j].nom}' dans son panier.`)
    }
    else if (epicerie.ingredients[j].nom == 'fromage') {
        console.log(`🧀 ${personnage.nom} met le produit '${epicerie.ingredients[j].nom}' dans son panier.`)
    }
    else if (epicerie.ingredients[j].nom == 'oeufs') {
        console.log(`🥚 ${personnage.nom} met le produit '${epicerie.ingredients[j].nom}' dans son panier.`)
    }
    else if (epicerie.ingredients[j].nom == 'sel' || epicerie.ingredients[j].nom == 'poivre') {
        console.log(`🧂 ${personnage.nom} met le produit '${epicerie.ingredients[j].nom}' dans son panier.`)
    }
}
console.log(" ")
console.log("══════════════════════")
console.log("| Ticket de caisse :")

for (let j=0 ; j < epicerie.ingredients.length ; j++) {
    console.log(`| ${epicerie.ingredients[j].nom} ...... ${epicerie.ingredients[j].prix} \u20AC`)
}

console.log("_________________")
console.log(`| TOTAL : ${total} \u20AC`)
console.log("𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃")
console.log("══════════════════════")
console.log(" ")
console.log(`💰 Il paie. Il lui reste ${personnage.argent} \u20AC.`)
console.log("────────────────────────")

//// retourner à la maison ////

personnage.seDeplacer(maison)

//// mettre chaque ingrédient contenu dans le panier tenu dans la main droite du personnage > l'objet bol ////

console.log("🧑‍🍳 Il est prêt à commencer à cuisiner.")
for (let k = 0 ; k < personnage.mainDroite[0].contenu.length ; k ++) {
    bol.contenu.push(personnage.mainDroite[0].contenu[k])
    console.log(`🍲 '${personnage.mainDroite[0].contenu[k].nom}' a été mis dans le bol`)
    // à chaque ingrédient mis dans le bol, on le retire du contenu du panier tenu dans la main droite
    var newArray = personnage.mainDroite[0].contenu.slice(k+1)
    // on met un +1 car sinon à la fin il va rester le dernier élément dans le panier (il ne sera pas sliced)
    // on a créé une nouvelle array car sinon les changements ne sont pas stockés (l'array originale n'est pas modifiée)
}

personnage.mainDroite[0].contenu = newArray
console.log("🧺 Le contenu du panier est désormais vide :")
console.log(newArray)
// on réatribue la variable > le panier tenu dans la main droite est maintenant vide
console.log("────────────────────────")

//// retourner à l'épicerie pour rendre le panier vide ////

console.log(`🤞 ${personnage.nom} est honnête et veut rendre le beau panier de l'épicerie. Il prend sa voiture pour y retourner.`)
personnage.seDeplacer(epicerie)

for (let i = 0 ; i < personnage.mainDroite.length ; i++) {
    // si le personne a quelque chose dans sa main droite :
    if (personnage.mainDroite.length > 0) {
        var panierARendre = personnage.mainDroite[i]
        epicerie.paniers.push(personnage.mainDroite[i])
        // on prend ce qu'il a dans la main droite et on le met dans la collection de paniers du magasin
        personnage.mainDroite.slice(i+1)
        // on retire de la main droite l'élément question
        var main = personnage.mainDroite.slice(i+1)
        // comme l'array originale n'est pas modifiée, on crée une nouvelle variable
    }
    // si le personnage n'a rien dans sa main droite :
    else if (personnage.mainDroite.length == 0) {
        let r = Math.floor(Math.random() * epicerie.paniers.length)
        // on prend un panier au hasard parmis ceux qui sont disponibles
        personnage.mainDroite.push(epicerie.paniers[r])
        // one le met dans la main droite
        epicerie.paniers.splice(r, 1)
        // one le retire des paniers disponibles à l'épicerie
    }
}
personnage.mainDroite = main
// on réattribue la variable
console.log(`✋ La main droite de ${personnage.nom} est maintenant vide :`)
console.log(personnage.mainDroite)
console.log(`🙋 ${personnage.nom} a redéposé le ${panierARendre.type} à l'épicerie.`)

//// on retourne à la maison pour continuer l'omelette ////
console.log("────────────────────────")
console.log("💪 Maintenant les choses sérieuses peuvent commencer.")
personnage.seDeplacer(maison)

for (let i = 0 ; i < bol.contenu.length ; i++) {
    if (bol.contenu[i].etats == "entier") {
        personnage.couper(bol.contenu[i])
        if (epicerie.ingredients[i].nom == 'ail') {
            console.log(`🧄 '${bol.contenu[i].nom}' a été ${bol.contenu[i].etats}`)
        }
        else if (epicerie.ingredients[i].nom == 'oignon') {
            console.log(`🧅 '${bol.contenu[i].nom}' a été ${bol.contenu[i].etats}`)
        }
        else if (epicerie.ingredients[i].nom == 'fromage') {
            console.log(`🧀 '${bol.contenu[i].nom}' a été ${bol.contenu[i].etats}`)
        }
        else if (epicerie.ingredients[i].nom == 'oeufs') {
            console.log(`🥚 '${bol.contenu[i].nom}' a été ${bol.contenu[i].etats}`)
        }
        else if (epicerie.ingredients[i].nom == 'sel' || epicerie.ingredients[i].nom == 'poivre') {
            console.log(`🧂 '${bol.contenu[i].nom}' a été ${bol.contenu[i].etats}`)
        }
    }
}

//// On cuisine ////

console.log("────────────────────────")

console.log(`🥄 ${personnage.nom} commence à mélanger les ingrédients dans le bol.`)
// on crée la nouvelle instance de la classe ingrédients, qui est "omelette"
let omelette = new Ingredients("omelette", ["cru"], 0)

// on mélange
bol.melanger(omelette)
console.log(`🥘 Le bol contient désormais l'${bol.contenu[0].nom} dans un état ${bol.contenu[0].etats}.`)

// maintenant on vide le bol dans la poêle

poele.contenu.push(bol.contenu[0])
console.log("🍳 On vide le contenu du bol dans la pôele :")

// on vide le bol
bol.contenu.splice(bol.contenu.indexOf(bol.contenu[0]),1)
console.log("🥣 Le bol est désormais vide :")
console.log(bol.contenu)

// on cuit
console.log("────────────────────────")
console.log("⏱️⏱️⏱️⏱️⏱️")
poele.cuire()
