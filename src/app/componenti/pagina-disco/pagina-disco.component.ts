import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from 'src/app/servizi/albums.service';
import { Observable } from 'rxjs';
import { Song } from 'src/app/song';
import { tap, filter } from 'rxjs/operators';
import { TabComponent } from '../tab/tab.component';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pagina-disco',
  templateUrl: './pagina-disco.component.html',
  styleUrls: ['./pagina-disco.component.css']
})
export class PaginaDiscoComponent implements OnInit {
  id: string | null = null;
  album!: Observable<any>;

  title!: string;
  artist!: string;
  genre!: string;
  coverUrl!: string;
  albumList: any[] = [];


  constructor(
    public servizio: AlbumsService,
    private route: ActivatedRoute,
    public firebaseService : FirebaseService,

  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("Album ID:", this.id);
     
    const albumId = this.id !== null ? parseInt(this.id, 10) : null;
  
    if (albumId !== null && !isNaN(albumId)) {
      this.firebaseService.getAlbums().pipe(
        switchMap((data: any) => {
          this.albumList = data;
          console.log(this.albumList);
          
          // Filter the album list to include only the one with the specified ID
          const selectedAlbum = this.albumList.find(album => album.id === albumId);
  
          // Use the type assertion to tell TypeScript that albumId is not null
          return selectedAlbum ? this.servizio.getAlbumInfoById(albumId.toString() as string) : [];
        })
      ).subscribe(albumData => {
        console.log("Album Data:", albumData);
  
        if (albumData) {
          this.title = albumData.title;
          console.log(this.title);
          this.artist = albumData.artist;
          this.genre = albumData.genre;
          this.coverUrl = albumData.coverUrl;
        } else {
          console.error("Dati dell'album non validi o mancanti.");
        }
      }, error => {
        console.error("Error fetching album information:", error);
      });
    } else {
      console.error("L'ID dell'album non è un numero valido.");
    }
}
}
