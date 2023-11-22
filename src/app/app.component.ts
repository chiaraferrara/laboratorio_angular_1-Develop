import { Component} from '@angular/core';
import { FirebaseService } from './servizi/firebase.service';
import { Router } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  valoreDellId!: number;
	isSignedIn = true;
  isAuthenticated: boolean = false;
  title = 'ViniliMaurizio';

  constructor(public firebase : FirebaseService, public router: Router ){
    firebase.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }
   
  @Input() albumId!: string;
  genreSelected: string = 'all';

  updateSelectedGenre(newGenre: any) {
    this.genreSelected = newGenre;
  }

  onInit(){
    console.log(this.genreSelected)
    if(this.isAuthenticated == true){
      console.log("You are logged in")
    }
  }

  faiLogout(){
    this.isSignedIn =  false;
	}

  viewDashboard() {
    this.firebase.viewDashboard();
  }
}
