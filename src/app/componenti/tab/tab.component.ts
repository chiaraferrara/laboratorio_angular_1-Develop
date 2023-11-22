import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'
import { Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Song } from 'src/app/song';
import { UserService } from 'src/app/servizi/user.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})



export class TabComponent implements OnInit {
  
  // sendTitle = new BehaviorSubject<string>('');
  // @Output() genreSelected = new EventEmitter<string>();
  favoriteAlbums: any[] = [];
  album: any[] = [];
  albumList: any[] = [];
  itemsPerPage = 4;
  paginaCorrente = 0;
  albumPaginati: any[] = [];

  username!: string;
  userId!: string;
  userEmail: string = '';
  newFavoriteAlbums: string[] = [];
  lastAlbum: any;

  sendID = new Subject<string>();
  sendID$ = this.sendID.asObservable();

  constructor(
    // public servizio : AlbumsService 
    public router: Router,
    public firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public userService: UserService) {
  }



  ngOnInit() {
    this.firebaseService.getAlbums().subscribe((data: any) => {
      this.albumList = data;
      this.getLastAlbum();
      this.paginazione();
    });

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.userService.getCurrentUserData();
      }
    });


    this.lastAlbum = this.albumList[this.albumList.length - 1];



  }

  getLastAlbum() {
    if (this.albumList.length > 0) {
      // ordina l'array albumList in base all'ID in modo crescente
      this.albumList.sort((a, b) => a.id - b.id);

      // ora l'ultimo album sarà l'elemento con l'ID più alto
      this.lastAlbum = this.albumList[this.albumList.length - 1];
    }
  }

  //aggiungiAlbumPreferito(userId: string, albumId: string):

  // Questo metodo serve per aggiungere un album ai preferiti di un utente nel Firestore. Ecco come funziona:

  // 1) Prende l'ID dell'utente e l'ID dell'album come argomenti.
  // 2) Crea un riferimento al documento utente utilizzando l'ID dell'utente.
  // 3) Esegue .get() su questo riferimento per ottenere il documento utente.
  // 4) Nel gestore dell'evento, verifica se il documento esiste. Se esiste, estrae i dati del documento, in particolare l'array "favorites" che contiene gli album preferiti dell'utente.
  // 5) Se il campo "favorites" non esiste, lo inizializza come un array vuoto.
  // 6) Verifica se l'album non è già nell'array "favorites". Se non è presente, lo aggiunge all'array.
  // 7) Infine, aggiorna il documento utente con il nuovo array "favorites" contenente l'album appena aggiunto.
  // 8) In sintesi, questo metodo ottiene il documento utente, aggiunge l'album ai preferiti dell'utente e quindi aggiorna il documento utente nel Firestore.

  onAggiungiAiPreferitiClick(albumId: string) {
    this.userService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userService.getUserDocumentId(userId).then(userDocId => {
          if (userDocId) {
            this.userService.aggiungiAlbumPreferito(userDocId, albumId);
          } else {
            console.log("Nessun documento utente trovato per l'UID:", userId);
          }
        });
      } else {
        console.log("Nessun utente autenticato.");
      }
    });
  }


  onRimuoviDaPreferitiClick(albumId: string) {
    this.userService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userService.getUserDocumentId(userId).then(userDocId => {
          if (userDocId) {
            // Ora puoi rimuovere l'album preferito
            this.userService.rimuoviAlbumPreferito(userDocId, albumId);
          } else {
            console.log("Nessun documento utente trovato per l'UID:", userId);
          }
        });
      } else {
        console.log("Nessun utente autenticato.");
      }
    });
  }
  


  // sendInfo(title: string) {
  //   console.log("Titolo passato a sendTitle:", title);
  //   sendTitle.next(title);
  //   this.router.navigateByUrl('page');

  // }

  @Output() sendId = new EventEmitter<string>();

  sendInfo(albumId: string) {
    console.log("Tentativo di inviare ID:", albumId);
    this.sendID.next(albumId);
    console.log("ID passato a sendID:", albumId);
    this.router.navigateByUrl(`/album/${albumId}`);
  }
  paginazione() {
    const indiceInizio = this.paginaCorrente * this.itemsPerPage; //rappresenta l'indice della pag. corrente = 0 e numero di album da visualizzare = 6
    const indiceFine = indiceInizio + this.itemsPerPage;
    this.albumPaginati = this.albumList.slice(indiceInizio, indiceFine); //l'array album paginati è il risultato degli album compresi tra indice inizio e fine.
  }

  paginaSuccessiva() {
    this.paginaCorrente++;
    this.paginazione();
  }

  paginaPrecedente() {
    this.paginaCorrente--;
    this.paginazione();
  }


  //aggiunge un album
  //TODO: cambiare any con il tipo consono
  add(a: any) {
    // this.servizio.addFavourite(a);
  }
}




