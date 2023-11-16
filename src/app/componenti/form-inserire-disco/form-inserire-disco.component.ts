import { Component } from "@angular/core";
import { Song } from "src/app/song";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SongService } from "src/app/servizi/song.service";
import { FormsModule } from "@angular/forms";

@Component({
	selector: "app-form-inserire-disco",
	templateUrl: "./form-inserire-disco.component.html",
	styleUrls: ["./form-inserire-disco.component.css"],
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
})
export class FormInserireDiscoComponent {
	song: Song = new Song(0, '','', '', '');

	constructor(private songService: SongService){}

	addSong() {
		this.songService.addSong(this.song).then(() => {
		  this.song = new Song(0, '', '','', '');
		});
	  }

}
