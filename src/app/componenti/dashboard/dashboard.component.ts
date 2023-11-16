import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { UserService } from 'src/app/servizi/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userEmail : string = '';
  username : string = '';
  userList!: User[];
  avatar!: string ;
  userId!: string;
  uploadavatar : boolean =  false ;
  currentUserId: string = '';
  userAvatarUrl: string = '';
  constructor(private userService: UserService, private firebaseService: FirebaseService){}

  ngOnInit() {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      //ottiene l'elenco degli utenti dal servizio user
      this.userService.getUsers().subscribe((data: any) => {
        //trova i dati dell'utente corrente
        const currentUserData = data.find((user: any) => user.email === currentUser.email);
  
        if (currentUserData && currentUserData.username && currentUserData.email && currentUserData.avatar) {
          this.avatar = currentUserData.avatar;
          this.username = currentUserData.username;
          this.userEmail = currentUserData.email;
          this.userId = currentUserData.uid;
        } else {
          console.log("Campi mancanti nei dati dell'utente.");
        }
        
      });
    }
  }

  toggleAvatar(){
    this.uploadavatar = !this.uploadavatar;
  }

  onEvent(event: any) {
    this.uploadavatar = event;
  }
}

