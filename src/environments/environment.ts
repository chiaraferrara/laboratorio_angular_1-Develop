// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

interface SpotifyEnvironment {
  production: boolean;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  clientId: string;
  clientSecret: string;
}

export const environment: SpotifyEnvironment = {
  production: false,
  clientId: '56337ff0ba5841e79dd2d0d4c717867f',
  clientSecret: '6693dc56332445d1ba0ce4b32a4769af',
  firebaseConfig: {
    apiKey: "AIzaSyAgsPf8ri_L-QTFX6MJOy_IHl_SHw0FG3c",
    authDomain: "vinili-165f8.firebaseapp.com",
    projectId: "vinili-165f8",
    storageBucket: "vinili-165f8.appspot.com",
    messagingSenderId: "1093712895302",
    appId: "1:1093712895302:web:4c2b2847422aa2a997d947",
  },
};


// const app = initializeApp(environment.firebaseConfig);
// const firestore = getFirestore(app);


// per le chiamate al database
// const docRef = doc(firestore, 'your_collection', 'your_document_id');
