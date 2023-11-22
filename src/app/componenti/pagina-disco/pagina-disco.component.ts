import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from 'src/app/servizi/albums.service';
import { Observable } from 'rxjs';
import { Song } from 'src/app/song';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { UserService } from 'src/app/servizi/user.service';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-pagina-disco',
  templateUrl: './pagina-disco.component.html',
  styleUrls: ['./pagina-disco.component.css']
})
export class PaginaDiscoComponent implements OnInit {
  id: string | null = null;
  album!: Observable<any>;
  albumList: Song[] = [];
  @Input() albumId!: string;

  title!: string;
  artist!: string;
  genre!: string;
  coverUrl!: string;

  constructor(
    public servizio: AlbumsService,
    private authService: FirebaseService,
    private userService: UserService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("L'album id è " + this.id)
    if (this.id != null) {
      console.log(this.id)
      this.album = this.getAlbum(this.id).pipe(
        filter(albumData => albumData !== null),
        map(albumData => {
          
          const songs = Array.isArray(albumData.songs)
            ? albumData.songs.map((songData: any) => {
                this.title = songData.title;
                console.log(this.title)
                this.artist = songData.artist;
                this.genre = songData.genre;
                this.coverUrl = songData.coverUrl;
  
                return new Song(
                  songData.id,
                  songData.title,
                  songData.artist,
                  songData.genre,
                  songData.coverUrl,
                );
              })
            : []; 
  
          return { ...albumData, songs };
        })
      );
    }
  }
  
  
  getAlbum(id: string): Observable<any> {
    return this.db.object('/albums/' + id).valueChanges();
  }
}
