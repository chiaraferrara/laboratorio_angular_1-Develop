
import { Component , Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/servizi/user.service'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {
  constructor ( 
    // public servizio : AlbumsService 
    public router :  Router, 
    public firebaseService: FirebaseService,
    public afAuth : AngularFireAuth,
    public firestore : AngularFirestore,
    public userService : UserService){ 
    }

    avatar!: string ;
    
    @Input() userId!: string;
    @Input() imageUrl!: string;
    @Output() onButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    buttonClick() {
      this.onButtonClick.emit(false);
    }

    ngOnInit() {
      const currentUser = this.userService.getCurrentUser();
      if (currentUser) {
        //ottiene l'elenco degli utenti dal servizio user
        this.userService.getUsers().subscribe((data: any) => {
          //trova i dati dell'utente corrente
          const currentUserData = data.find((user: any) => user.email === currentUser.email);
    
          if (currentUserData && currentUserData.avatar) {
            this.avatar = currentUserData.avatar;
            this.userId = currentUserData.uid;
          } else {
            console.log("Campi mancanti nei dati dell'utente.");
          }
          
        });

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.userId = user.uid;
            this.userService.getCurrentUserData();
          }
        });
      }
      
    }
    updateAvatar(avatar: string) {
      this.userService.getCurrentUserId().subscribe(userId => {
        if (userId) {
          this.userService.getUserDocumentId(userId).then(userDocId => {
            if (userDocId) {
              this.userService.updateAvatar(userDocId, avatar);
              
            } else {
              console.log("Nessun documento utente trovato per l'UID:", userId);
            }
          });
        } else {
          console.log("Nessun utente autenticato.");
        }
      });
    }
    
    
}
