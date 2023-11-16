import { Component } from '@angular/core';

@Component({
  selector: 'app-commenti',
  templateUrl: './commenti.component.html',
  styleUrls: ['./commenti.component.css']
})
export class CommentiComponent {

    commentName = '';
    commentMessage = '';
    comments: { name: string, message: string }[] = [];
  
    addComment() {
      if (this.commentName && this.commentMessage) {
        this.comments.push({ name: this.commentName, message: this.commentMessage });
        this.commentName = '';
        this.commentMessage = '';
      } else {
        alert('Eh no. Non funziona se non inserisci username e commento!');
      }
    }
  }
