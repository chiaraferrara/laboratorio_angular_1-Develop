import { AfterViewInit, Component } from '@angular/core';
import { AlbumsService } from 'src/app/servizi/albums.service';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-carosello',
  templateUrl: './carosello.component.html',
  styleUrls: ['./carosello.component.css']
}) 


export class CaroselloComponent implements AfterViewInit{

  @ViewChild('nextButton', { static: false }) nextButton!: ElementRef;

  constructor(public servizio : AlbumsService,
    private renderer: Renderer2){
  }
  
  sources: string[] = [];
  isNext = true;
  transitionClass = 'transizione';

  get currentImage(): string {
    return this.sources[this.servizio.currentSlideIndex];
  }

  // differenza tra ngOnInit e ngAfterViewInit
  // ngOnInit: Viene chiamato una sola volta, subito dopo che Angular ha inizializzato il componente.
  // ngAfterViewInit: Viene chiamato dopo che Angular ha inizializzato la vista del componente.
  
  ngAfterViewInit(): void {

    // questo cambia l'img ogni 3 secondi
    setInterval(() => {
      this.changeImageWithTransition();
    }, 8000);
  }


  ngOnInit():void{
    this.sources = this.servizio.carousel;
  }

  changeImageWithTransition(): void {
    // questo applica la classe di transizione tra un'img e un'altra
    this.transitionClass = 'fade-out';

    // cambia img metodo sotto
    setTimeout(() => {
      this.simulateButtonClick(this.nextButton);

      //reset della classe di transizione
      setTimeout(() => {
        this.transitionClass = '';
      }, 800); // 9 secondi
    }, 800); 
  }


  simulateButtonClick(button: ElementRef): void {
    this.renderer.selectRootElement(button.nativeElement).click();
  }
  
}
