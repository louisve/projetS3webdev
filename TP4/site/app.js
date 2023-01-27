import { TacheHtml } from "./tacheHtml.js";
import { ListeHtml } from "./listeHtml.js";
import { ajoutTaches } from "./api.js";

export class Application {

    listeTachesHtml;

    constructor(taches) {

        // récupère l'élément HTML d'id listeTaches
        this.listeTachesHtml = document.getElementById('listeTaches');

        // Boucle sur toutes les taches
        taches.forEach(todo => {
            //Pour chaque tache on crée une balise HTML div contenant le titre de la tache
            let tacheHtml = new TacheHtml(todo);
            // On attache ce nouvel élément HTML à la div
            this.listeTachesHtml.appendChild(tacheHtml.elementParentHTML);
        });

        const buttonAdd = document.getElementById("buttonAjoutTache");
        buttonAdd.addEventListener("click", (e) => { //async (e) => {
            let inputAjoutTache = document.getElementById('inputAjoutTache');
            let maTache = { "titre": inputAjoutTache.value, "termine": false };
            ajoutTaches(maTache).then((rep) => {
                console.log(rep);
                maTache._id = rep.insertedId;
                let tacheHtml = new TacheHtml(maTache);
                this.listeTachesHtml.appendChild(tacheHtml.elementParentHTML);
            });
            // let rep = await ajoutTaches(maTache);
            // maTache._id = rep.id;
            // this.listeTachesHtml.appendChild(tacheHtml.elementParentHTML);     
        });
    }

    constructor(liste) {

        // récupère l'élément HTML d'id listeTaches
        this.listeHtml = document.getElementById('Liste');

        // Boucle sur toutes les taches
        liste.forEach(todo => {
            //Pour chaque tache on crée une balise HTML div contenant le titre de la tache
            let elemListeHtml = new ListeHtml(todo);
            // On attache ce nouvel élément HTML à la div
            this.listeHtml.appendChild(elemListeHtml.elementParentHTML);
        });

        const buttonAdd = document.getElementById("buttonAjouListe");
        buttonAdd.addEventListener("click", (e) => { //async (e) => {
            let inputAjoutListe = document.getElementById('inputAjoutListe');
            let maListe = { "titre": inputAjoutListe.value, "termine": false };
            ajoutTaches(maListe).then((rep) => {
                console.log(rep);
                maListe._id = rep.insertedId;
                let elemListeHtml = new ListeHtml(maTache);
                this.listeHtml.appendChild(elemListeHtml.elementParentHTML);
            });
            // let rep = await ajoutTaches(maTache);
            // maTache._id = rep.id;
            // this.listeTachesHtml.appendChild(tacheHtml.elementParentHTML);     
        });
    }
}