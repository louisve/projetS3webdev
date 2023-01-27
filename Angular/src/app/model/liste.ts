import { Tache } from "./tache";

export interface Liste {
    _id?:string;
    titre:string;
    taches?:Array<Tache>
}
