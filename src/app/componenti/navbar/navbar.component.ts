import { Component, OnInit, Output , EventEmitter, Input} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/servizi/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input() isAuthenticated: boolean = false; 
  @Output() isLogout = new EventEmitter<void>()

  constructor(public firebase : FirebaseService, private afAuth: AngularFireAuth){
    
  }

  ngOnInit(): void {
    
  }
logout(){
  this.firebase.logout()
  this.isLogout.emit()
}
}
