import { Component } from '@angular/core';
import { AlbumsService } from 'src/app/servizi/albums.service';

@Component({
  selector: 'app-carosello',
  templateUrl: './carosello.component.html',
  styleUrls: ['./carosello.component.css']
})
export class CaroselloComponent {

  constructor(public servizio : AlbumsService){
  }
  
  sources: string[] = [];
  
  get currentImage(): string {
    return this.sources[this.servizio.currentSlideIndex];
  }
  
  ngOnInit():void{
    this.sources = this.servizio.carousel;
  }
}
