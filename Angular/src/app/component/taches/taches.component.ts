import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';
import { ListeService } from 'src/app/service/liste.service';
import { Liste } from 'src/app/model/liste';


@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})

export class TachesComponent implements OnInit {
  taches: Array<Tache> = [];
  listes: Array<Liste> = [];

  @Input('liste') public liste!: Liste

  newTache: Tache = {
    titre : '',
    termine : false,
    idListe: ''
  };
  
  filter:string = 'Tous';

  constructor(private tacheService: TachesService,
    private listeService: ListeService,
    private userService: UserService,
    private router: Router){ }
  
  ngOnInit(): void {

    this.tacheService.getTaches().subscribe({
      next: (data:Array<Tache>) => { this.taches = data; }
    });

    this.listeService.getListes().subscribe({
      next: (data:Array<Liste>) => { this.listes = data; }
    });

  }  

  ajouter(liste: Liste) {
    this.tacheService.ajoutTaches(this.newTache).subscribe({
      next: (data) => {
        this.taches.push(data);
      }
    });

    this.tacheService.getTaches().subscribe({
      next: (data:Array<Tache>) => { 
        this.liste.taches = data; }
    });

    liste.taches = this.taches
    this.listeService.updateListes(liste).subscribe({
      next: (data) => {
      }
    });

    this.newTache.idListe = liste.titre
    this.tacheService.updateTaches(this.newTache).subscribe({
      next: (data) => {
      }
    });
  } 

  supprimer(tache: Tache): void {
    this.tacheService.removeTaches(tache).subscribe({
      next: (data) => {
        this.taches = this.taches.filter(t => tache._id != t._id);
      }
    });

  }

  modifier(tache: Tache) {
    tache.termine = !tache.termine;
    this.tacheService.updateTaches(tache).subscribe({
      next: (data) => {
      }
    });
  }


  change(filter:string) {
    this.filter = filter;
  }
}