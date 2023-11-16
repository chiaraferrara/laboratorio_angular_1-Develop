import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/servizi/albums.service';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-pagina-preferiti',
  templateUrl: './pagina-preferiti.component.html',
  styleUrls: ['./pagina-preferiti.component.css']
})
export class PaginaPreferitiComponent implements OnInit {
  favoriteAlbums!: any[];
  title !: string;
  artist !: string;


  constructor(public servizio: AlbumsService, private authService: FirebaseService, private userService: UserService){
  }

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {      
      this.userService.getUsers().subscribe((data: any) => {
        
        const currentUserData = data.find((user: any) => user.email === currentUser.email);
  
        if (currentUserData && currentUserData.favorites) {
          // elenco degli id degli album preferiti dell'utente
          const favoriteAlbumIds = currentUserData.favorites;
  
          // collezione di album
          this.authService.getAlbums().subscribe((albums: any) => {
            // album che corrispondono ai preferiti dell'utente
            this.favoriteAlbums = albums.filter((album: any) => favoriteAlbumIds.includes(album.id));
            console.log(this.favoriteAlbums);
          });
        } else {
          console.log("Campi mancanti nei dati dell'utente.");
        }
      });
    }
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
}
