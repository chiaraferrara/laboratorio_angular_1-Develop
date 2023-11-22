import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { AngularFirestore  } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private firestore : FirebaseService, private afirestore: AngularFirestore) { }

  carousel: string[] = [
    'assets/carosello/carosello0gif.gif',
    // 'assets/carosello/carosello0.png',
    'assets/carosello/carosello1.png',
    'assets/carosello/carosello2.png'

  ];
  sendTitle = new Subject<string>();

  currentSlideIndex: number = 0;
  direction: number = 0;
  currentGenre: String = 'All';

  public albums !: any[];

 
  getAlbumDetail(albumId: string): Observable<any> {
     return this.afirestore.collection('albums').doc(albumId).valueChanges();
 }


//  async getAlbumDetails(albumId : string): Promise<any> {
//   try {
//     const albumDetails = await this.afirestore.collection('albums').doc(albumId).valueChanges().toPromise();
//     console.log("Album details received:", albumDetails);
//     return albumDetails;
//   } catch (error) {
//     console.error("Error while retrieving album details:", error);
//     throw error;
//   }
// }

getAlbumDetails(albumId: string): Observable<any> {
  return this.afirestore.collection('albums').doc(albumId).valueChanges();
}

getAllAlbums(): Observable<any[]> {
  return this.afirestore.collection('albums').valueChanges();
}

// TENTATIVO
selectedAlbum: any;

  setSelectedAlbum(album: any) {
    this.selectedAlbum = album;
  }

  getSelectedAlbum() {
    return this.selectedAlbum;
  }

  getFavouriteAlbums(uid: string) {
    return this.afirestore.collection(`users/${uid}/favorites`).valueChanges();
  }

  rimuoviAlbumPreferito(userId: string, albumId: string) {
    this.afirestore.collection('users').doc(userId).get().subscribe(userDoc => {
      if (userDoc.exists) {
        const userData = userDoc.data() as { favorites?: string[] };
  
        if (userData && userData.favorites) {
          const index = userData.favorites.indexOf(albumId);
          if (index !== -1) {
            userData.favorites.splice(index, 1);
            this.afirestore.collection('users').doc(userId).update({ favorites: userData.favorites })
              .then(() => {
                console.log('Album rimosso dai preferiti con successo.');
              })
              .catch(error => {
                console.error('Errore durante la rimozione dai preferiti:', error);
              });
          } else {
            console.log('Album ID non trovato nei preferiti.');
          }
        } else {
          console.log("L'array dei preferiti dell'utente non è definito.");
        }
      } else {
        console.log("Il documento utente non esiste.");
      }
    });
  }
  

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.carousel.length;
  }

  prevSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.carousel.length) % this.carousel.length;
  }



}
