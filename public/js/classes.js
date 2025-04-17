export class Lieu {
    constructor(nom, personnes) {
        this.nom = nom;
        this.personnes = personnes;
    }
}

export class Ingredients {
    constructor(nom, etats, prix) {
        this.nom = nom;
        this.etats = etats;
        this.prix = prix;
    }
}

export class Outils {
    constructor(nom) {
        this.nom = nom;
    }
}

export class Panier {
    constructor(type, contenu) {
        this.type = type;
        this.contenu = contenu;
    }
}