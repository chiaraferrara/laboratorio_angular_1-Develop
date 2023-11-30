import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SpotifyServiceService } from 'src/app/servizi/spotify-service.service';
import { FormControl } from '@angular/forms';
import { Artist } from 'src/app/artist';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  constructor(public spotify : SpotifyServiceService){}

  searchStr!: string;
  results!: Artist[];
  query: FormControl = new FormControl();

  ngOnInit() {
    this.query.valueChanges
      .pipe(
        //questo debounce significa che aspetterà 400 millisecondi prima di procedere...
        debounceTime(400),
        distinctUntilChanged(),
        //questa è la funzione di ricerca
        switchMap(query => this.spotify.getAuth()
          .pipe(
            //utilizza l'access token (environment) per effettuare ricerca
            switchMap(res => this.spotify.searchMusic(query, 'artist', res.access_token))
          )
        )
      )
      .subscribe(
        res => {
          //visualizziamo...
          console.log(res.artists.items);
          this.results = res.artists.items;
        }
      );
  }

}
