// song.model.ts

export class Song {
    id: number;
    title: string;
    artist: string;
    genre : string;
    coverUrl: string;
  
    constructor(id: number, title: string, artist: string, genre :  string,  coverUrl: string) {
      this.id = id;
      this.title = title.toUpperCase();      
      this.artist = artist.toUpperCase(); ;
      this.genre = genre.toUpperCase();
      this.coverUrl = coverUrl.toUpperCase();
    }
  }
  