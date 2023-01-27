import { Component, Input, OnInit } from '@angular/core';
import { TachesComponent } from 'src/app/component/taches/taches.component';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';
import { TachesService } from 'src/app/service/taches.service';
import { UserService } from 'src/app/service/user.service';
import { ListeService } from 'src/app/service/liste.service';
import { Liste } from 'src/app/model/liste';
import { endWith } from 'rxjs';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})

export class ListeComponent {
  listes: Array<Liste> = [];

  newListe: Liste = {
    titre : ''
  };

  liste = this.newListe
  
  constructor(private listeService: ListeService,
    private tacheService: TachesService,
    private userService: UserService,
    private router: Router){ }

  ngOnInit(): void {
    this.listeService.getListes().subscribe({
      next: (data:Array<Liste>) => { this.listes = data; }
    });
    this.tacheService.getTaches().subscribe({
      next: (data:Array<Tache>) => { 
        this.newListe.taches = data; 
      }
    });
  }

  ajouterListe() {
    this.tacheService.getTaches().subscribe({
      next: (data:Array<Tache>) => { 
        this.newListe.taches = data; 
      }
    });

    this.listeService.ajoutListes(this.newListe).subscribe({
      next: (data) => {
        this.listes.push(data);
      }
    });
    
  }  

  loggout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }
  
  supprimerListe(liste: Liste): void {
    this.listeService.removeListes(liste).subscribe({
      next: (data) => {
        this.listes = this.listes.filter(t => liste._id != t._id);
      }
    });

  }

}
