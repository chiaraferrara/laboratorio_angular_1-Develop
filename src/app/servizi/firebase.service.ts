import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';
import { User } from '../user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 
  username : string = '';
  isAuthenticated : boolean = false;
  userEmail: string = '';

  constructor(private userService : UserService, 
    private firebaseAuth: AngularFireAuth, 
    private router : Router, 
    private firestore : AngularFirestore, 
    private afAuth: AngularFireAuth ) { 
    this.firebaseAuth.setPersistence('local');
   
  }

  login(email: string, password: string) {
    //questo esegue l'accesso con un metodo di firebase authentication e se ha successo
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then( () => {
        this.userEmail = email; //memorizza email
        localStorage.setItem('token', 'true'); //questo assegna un token che dice che l'utente è autenticato
        this.router.navigate(['']); //rimanda alla home
        this.isAuthenticatedSubject.next(true); //autenticato == true - il subject notifica del fatto che è autenticato a chi lo riceve
        this.isAuthenticated = true;        
      }, err =>{  
        //altrimenti . . .
        alert("Le informazioni sono errate.");
        this.router.navigate(['/login'])
      })
  }



  registrazione(username: string, email: string, password: string, favorites: string[], avatar: string) {
  // Set the default avatar URL here
  avatar = 'https://i.ibb.co/Ph8h1Mq/user-avatar2.png';

  this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then((authResult) => {
      const uid = authResult.user?.uid;

      if (uid) {
        const userData = {
          uid: uid,
          username: username,
          email: email,
          favorites: favorites,
          avatar: avatar, 
        };

        
        this.userService.createUser(userData).then((docRef) => {
          const userDocId = docRef.id;

          
          this.userService.getUserDocumentIdByEmail(email).subscribe((docId: string | null) => {
            if (docId !== null) {
              console.log("L'id del documento non è stato trovato:", docId);
            } else {
              console.log("Nessun documento trovato");
            }
          });

          alert('Registrazione avvenuta con successo');
          this.isAuthenticated = true;
          this.router.navigate(['/login']);
        }).catch((error) => {
          console.error('Errore nel creare il doc.', error);
        });
      } else {
        console.error('UID non disponibile');
      }
    })
    .catch((error) => {
      console.error('Errore:', error);
      alert("C'è stato un errore nella this.registrazione. La password deve essere di almeno 6 caratteri.");
      
    });
}

  



getAlbums(): Observable<any[]> {
  return this.firestore.collection('albums').valueChanges();
}
    

  logout() {
    this.firebaseAuth.signOut().then( () => {
        this.isAuthenticated = false;
        localStorage.removeItem('token'); //questo token è importante per la sicurezza. Se si slogga e relogga il token deve cambiare. Quindi "remove" al logout importante.
        this.router.navigate(['/login']);
        this.isAuthenticatedSubject.next(false);
        
      }, err => {
        alert()
      });
  }

//il behavioursubject controlla lo stato dell'autenticazione
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
//osservabile così gli altri componenti possono tenerne conto...
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  setAuthenticated(isAuthenticated: boolean) {
    
  }

  viewDashboard() {
    this.isAuthenticated = true;
    this.router.navigate(['/dashboard']);
  }

  setUsername(username : string){
    this.username = username;
  }
//metodo per aggiungere ai prefriti del database. non funzionante ancora.

getUserId(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        console.log("UID dell'utente autenticato: " + uid);
        resolve(uid);
      } else {
        console.log("Nessun utente autenticato.");
        resolve(null);
      }
    });
  });
}


getFavoriteAlbumsByIds(albumIds: number[]): Observable<any[]> {
  const albumsRef = this.firestore.collection('albums');
  return albumsRef.valueChanges().pipe(
    map((albums: any[]) => albums.filter(album => albumIds.includes(album.id)))
  );
}

}