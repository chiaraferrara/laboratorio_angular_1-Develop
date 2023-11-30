import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment.development';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
@Injectable({
  providedIn: 'root'
})
export class SpotifyServiceService {

  private searchUrl!: string;
  private artistUrl!: string;
  private albumsUrl!: string;
  private albumUrl!: string;

  private clientId: string = (environment as any).clientId;
  private clientSecret: string = (environment as any).clientSecret;
  private body: any;

  constructor(private http: HttpClient) { } 
  
  
  getAuth = () => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret));
      headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
  
      let params = new HttpParams();
      params = params.set('grant_type', 'client_credentials');
      let body = params.toString();
  
      return this.http.post('https://accounts.spotify.com/api/token', body, { headers: headers })
        .pipe(map((res: any) => res));
    }


    searchMusic = (query: string, type = 'artist', authToken: string) => {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + authToken);
    
      this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&offset=0&limit=20&type=' + type + '&market=US';
    
      return this.http.get(this.searchUrl, { headers: headers })
        .pipe(map((res: any) => res));
    }
    



}
