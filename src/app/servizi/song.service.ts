import { Injectable } from '@angular/core';
import { Song } from '../song';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlbumsService } from './albums.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  newId !: number;


  constructor(private firestore: AngularFirestore ,private  albumService :  AlbumsService) {}

  addSong(song: Song) {
    return this.firestore.collection('albums', ref => ref.orderBy('id', 'desc').limit(1))
      .get() //query per ottenere l'ultimo album
      .toPromise() //converte l'observable in una promessa
      .then(querySnapshot => {
        let newId = 0;
  //verifica se la query ha restituito risultati e se non è vuota
        if (querySnapshot && !querySnapshot.empty) {
          //ottieni i dati del primo documento (l'ultimo album)
          const lastAlbum = querySnapshot.docs[0].data() as Song; 
          //calcola il nuovo id come l'id dell'ultimo album + 1
          newId = lastAlbum.id + 1;
        }
  
        return this.firestore.collection('albums').add({
          id: newId,
          title: song.title.toUpperCase(),
          artist: song.artist.toUpperCase(),
          genre: song.genre.toUpperCase(),
          coverUrl: song.coverUrl.toUpperCase(),
          description: song.description,
        });
      });
  }
  
  
  getLastAlbumId(song: Song) {
    return this.addSong(song).then(newAlbumId => {
      return newAlbumId;
    });
}
    }
  
