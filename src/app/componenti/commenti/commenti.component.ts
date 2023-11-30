import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { Input } from '@angular/core';

interface Comment {
  date: Date; 
  content: string;
  id: string;
  user: User;
  userData?: any;
}

@Component({
  selector: 'app-commenti',
  templateUrl: './commenti.component.html',
  styleUrls: ['./commenti.component.css']
})
export class CommentiComponent {

    commentName = '';
    commentMessage = '';
    albumList: any[] = [];
    comments : Comment[] = [];
    


    @Input() receivedId: string | null = null;

    constructor(
      public firebaseService: FirebaseService,
      private route: ActivatedRoute,){}
  
    // addComment() {
    //   if (this.commentName && this.commentMessage) {
    //     this.comments.push({ name: this.commentName, message: this.commentMessage });
    //     this.commentName = '';
    //     this.commentMessage = '';
    //   } else {
    //     alert('Eh no. Non funziona se non inserisci username e commento!');
    //   }
    // }

    ngOnInit() {
      this.fetchComments();
    }

    getKeys(obj: any): string[] {
      return obj ? Object.keys(obj) : [];
    }
    


    private fetchComments() {
      this.firebaseService.getAlbums().subscribe(
        (data: any[]) => {
          console.log('Fetched albums:', data);
          this.albumList = data;
    
          
          this.albumList.forEach(album => {
            if (album.comments) {
              album.comments.forEach((comment: Comment) => {
                const userRef = comment.user;
  
                this.firebaseService.getUserDataFromReference(userRef).subscribe(
                  (userData: User) => {
                    comment.user = userData;
                    console.log('User data:', userData);
                  },
                  (error: any) => {
                    console.error('errore:', error);
                  }
                );
              });
            }
          });
        },
        (error: any) => {
          console.error('errore:', error);
        }
      );
    }
    
    
}
