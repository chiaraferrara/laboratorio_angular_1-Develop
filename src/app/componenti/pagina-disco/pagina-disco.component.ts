import { Component, Input, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/servizi/albums.service';
import { sendTitle } from '../tab/tab.component';

@Component({
  selector: 'app-pagina-disco',
  templateUrl: './pagina-disco.component.html',
  styleUrls: ['./pagina-disco.component.css']
})
export class PaginaDiscoComponent implements OnInit {
  album: any[] = []
  broadcastValue: string = '';
  window!: Window;
  constructor(public servizio: AlbumsService) { }


  ngOnInit(): void {
    sendTitle.subscribe(val => {
      this.broadcastValue = val;
      console.log("Valore di broadcastValue:", this.broadcastValue);
    });
    this.album = this.servizio.albums;
    // se l'utente visita per la prima volta non si riavvia la pagina
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
      // invece se l'ha visitata
    } else {
      const performanceEntries = performance.getEntriesByType('navigation');
      if (performanceEntries.length > 0) {
        const entry = performanceEntries[0] as PerformanceNavigationTiming;
        if (entry.type === 'reload') {          
          const homeURL = "index.html"; 
          window.location.href = homeURL;
        }
      }
    }
  }


  onEvent(event: any) {
    this.album = event;
  }




}
