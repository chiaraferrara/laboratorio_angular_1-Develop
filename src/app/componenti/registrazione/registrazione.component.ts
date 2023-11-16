import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
  providers: [UserService],
})
export class RegistrazioneComponent {
  id!: string ;
  username : string = '';
  userDocId : string = '';
  seiregistrato : boolean = true;
  registerEmail : string = '';
	registerPassword : string = '';
  avatar : string = ' '

  constructor(public firebase : FirebaseService, private db: AngularFireDatabase, public router : Router , private afAuth: AngularFireAuth ){
		}


    register() {
      if(this.registerEmail == '') {
        alert('Please enter email');
        return;
      }
    
      if(this.registerPassword == '' || this.registerPassword.length < 6) {
        alert('Inserisci password valida. La password deve essere maggiore di 6 cifre.');
        return;
      }
    
      this.firebase.registrazione(this.username, this.registerEmail, this.registerPassword, [], this.avatar);
;
      
      this.registerEmail = '';
      this.registerPassword = '';
  
    
      }
  

		



	  toggleRegistrato() {
		this.seiregistrato = !this.seiregistrato;
	  }




}
