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
     
    this.firebaseService.getAlbums().subscribe((data: any) => {
      this.albumList = data;
    })
}
}
