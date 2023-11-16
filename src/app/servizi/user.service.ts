import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../user';
import { Observable, Subscription, Observer, from } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})


export class UserService {
  private userDocSubscription: Subscription | undefined;
  userData = {
    uid: '' ,
    username: '',
    email: '',
    password: '',
    favorites: [''] ,
    avatar: '',
  }


  // dichiarazione utente corrente
  currentUser: any;
  username : string = "";
  userId!: string;
  userEmail : string = '';
  avatar : string = '';

  // authstate consente di vedere il cambiamento dell'autenticazione dell'utente

  constructor(private afAuth : AngularFireAuth , private firestore : AngularFirestore,) { 
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      console.log('Current User:', user);
    });
  }

  addUser(user : User) {
    
    return this.firestore.collection('users').add({
      avatar : user.avatar,
      uid: user.uid,
      username: user.username.toUpperCase(),
      email: user.email.toUpperCase(),
      favorites: user.favorites,
    });
  }

  getCurrentUser() {
    return this.currentUser;
  }

  createUser(user: User) {
    return this.firestore.collection('users').add(user);
  }

  getCurrentUserData() {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.getUserDocumentId(currentUser.uid).then((docId: string | null) => {
        if (docId) {
          this.firestore.collection('users').doc(docId).valueChanges().subscribe((user: any) => {
            if (user) {
              this.avatar = user.avatar;
              this.username = user.username;
              this.userEmail = user.email;
              this.userId = user.uid;
            }
          });
        }
      });
    }
  }
  
  
  
getUserDocumentIdByEmail(email: string): Observable<string | null> {
  const usersRef = this.firestore.collection<User>('users'); // Specifica il tipo User
  const query = usersRef.ref.where('email', '==', email);

  return new Observable<string | null>((observer) => {
    query.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          observer.next(doc.id); // Invia l'ID del documento all'osservatore
        });
      } else {
        observer.next(null); // Nessun documento trovato per l'email
      }
      observer.complete(); // Completa l'osservabile
    });
  });
}


//Spiegazione visto che ci ho messo giorni interi: 

// Questo metodo serve per ottenere l'ID di un documento utente nel Firestore in base all'UID dell'utente.

// 1- Prende l'UID dell'utente come argomento.
// 2- rea un riferimento alla raccolta "users" nel Firestore.
// 3- Utilizza una query per cercare documenti in cui il campo "uid" corrisponde all'UID fornito.
// 4- Esegue la query utilizzando .get(), che è un'operazione asincrona e restituisce una promessa.
// 5- Nel gestore della promessa, verifica se ci sono documenti restituiti dalla query.
// 6- Se ci sono documenti, scorre i risultati e estrae l'ID del documento.
// 7- Restituisce l'ID del documento o null se non sono stati trovati documenti.
// 8- In pratica, questo metodo cerca il documento utente nel Firestore in base all'UID e restituisce l'ID 
// 9- del documento o null se il documento non esiste. Questo è utile per ottenere l'ID del documento utente prima di eseguire operazioni su di esso (COME AGGIUNGERE PREFERITI -> vedi tab component).
getUserDocumentId(uid: string): Promise<string | null> {
  const usersRef = this.firestore.collection<User>('users').ref; 
  const query = usersRef.where('uid', '==', uid);

  return query.get().then((querySnapshot) => {
    if (!querySnapshot.empty) {
      let docId: string | null = null;
      querySnapshot.forEach((doc) => {
        docId = doc.id;
      });
      return docId;
    } else {
      return null;
    }
  });
}

updateUserFavorites(userId: string, newFavoriteAlbums: string[]) {
  const userRef = this.firestore.collection('users').doc(userId);

  userRef.update({ favorites: newFavoriteAlbums }).then(() => {
    console.log('Favorites updated successfully.');
  }).catch(error => {
    console.error('Error updating favorites:', error);
  });
}


aggiungiAlbumPreferito(userId: string, albumId: string) {
  const userDocRef = this.firestore.collection('users').doc(userId);

  userDocRef.get().subscribe((doc) => {
    if (doc.exists) {
      const userData = doc.data() as { favorites: string[] };
      if (userData) {
        if (!userData.favorites) {
          userData.favorites = [];
        }
        if (!userData.favorites.includes(albumId)) {
          userData.favorites.push(albumId);
          userDocRef.update({ favorites: userData.favorites });
        }
      }
    } else {
      console.log('Documento utente non esiste.');
    }
  });
}



updateAvatar(userId: string, avatar: string) {
  const userDocRef = this.firestore.collection('users').doc(userId);

  userDocRef.get().subscribe((doc) => {
    if (doc.exists) {
      const userData = doc.data() as { avatar: string };
      if (userData) {
        userData.avatar = avatar;
        userDocRef.update(userData).then(() => {
          console.log('Avatar aggiornato con successo');
        }).catch(error => {
          console.error('Errore durante l\'aggiornamento dell\'avatar:', error);
        });
      }
    } else {
      console.log('Documento utente non esiste.');
    }
  });
}




  getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(      
        map(user => user ? user.uid : null)
    );
   }


  // metodo per ottenere l'username dall'utente autenticato
getUsernameFromDatabase(){
  if (this.currentUser) { //se è autenticato
    const userId = this.currentUser.id; // prende id
    console.log(userId);
    const userdoc = this.firestore.collection('users').doc(userId); // riferimento al doc del database

    // Ottiene dal database
   userdoc.get().subscribe((doc) => {
      if (doc.exists) { // se esiste
        const data = doc.data() as {username: string}; //prende il valore dal database al campo username e lo attribuisce
        this.username = data.username;
        
      }
    });
  } return this.username;
}



getUsers(): Observable<any[]> {
  return this.firestore.collection('users').valueChanges();
}

rimuoviAlbumPreferito(userId: string, albumId: string) {
  this.firestore.collection('users').doc(userId).get().subscribe(userDoc => {
    if (userDoc.exists) {
      const userData = userDoc.data() as { favorites?: string[] };

      if (userData && userData.favorites) {
        const index = userData.favorites.indexOf(albumId);
        if (index !== -1) {
          userData.favorites.splice(index, 1);
          this.firestore.collection('users').doc(userId).update({ favorites: userData.favorites })
            .then(() => {
              console.log('Album rimosso dai preferiti con successo.');
            })
            .catch(error => {
              console.error('Errore durante la rimozione dai preferiti:', error);
            });
        } else {
          console.log('Album ID non trovato nei preferiti.');
        }
      } else {
        console.log("L'array dei preferiti dell'utente non è definito.");
      }
    } else {
      console.log("Il documento utente non esiste.");
    }
  });
}
}
