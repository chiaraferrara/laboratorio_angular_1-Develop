import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from 'src/app/servizi/albums.service';
import { TabComponent } from '../tab/tab.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Input } from '@angular/core';


@Component({
  selector: 'app-pagina-disco',
  templateUrl: './pagina-disco.component.html',
  styleUrls: ['./pagina-disco.component.css']
})
export class PaginaDiscoComponent implements OnInit {
  album: any = {};
  @Input() selectedAlbumId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private servizio: AlbumsService,
    private tabService: TabComponent,
    private firestore :  AngularFirestore
  ) { }

  ngOnInit(): void {
    if (this.selectedAlbumId) {
      this.loadAlbumDetails(this.selectedAlbumId);
      console.log(this.selectedAlbumId)
    }
  }

  private loadAlbumDetails(albumId: string) {
    this.servizio.getAlbumDetails(albumId).subscribe(albumDetails => {
      console.log("Dettagli dell'album ricevuti:", albumDetails);
      this.album = { ...albumDetails, title: albumDetails.title };
    });
  }
}