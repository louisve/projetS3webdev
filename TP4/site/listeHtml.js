import { removeListes } from "./api.js";

export class ListeHtml {

    elementParentHTML;
    liste;
    texte;

    constructor(liste) {
        this.liste = liste;
        this.elementParentHTML = document.createElement('div');

        this.texte = document.createElement('div')
        this.texte.textContent = liste.titre;

        let buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Supprimer';
        buttonDelete.addEventListener('click', e => this.remove());

        this.elementParentHTML.appendChild(this.texte);
        this.elementParentHTML.appendChild(buttonDelete);
    }

    async remove() {
        await removeListes(this.liste);
        this.elementParentHTML.remove();
    }

}