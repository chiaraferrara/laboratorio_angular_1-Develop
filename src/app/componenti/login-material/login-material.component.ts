import { Component, OnInit , Input, Output, EventEmitter} from "@angular/core";
import { FirebaseService } from "src/app/servizi/firebase.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
	selector: "app-login-material",
	templateUrl: "./login-material.component.html",
	styleUrls: ["./login-material.component.css"],
	
})
export class LoginMaterialComponent implements OnInit{
	loginEmail : string = '';
	registerEmail : string = '';
	loginPassword : string = '';
	registerPassword : string = '';

	seiregistrato : boolean = true;
	@Input() isAuthenticated !: boolean;
	@Output() dashboardClicked = new EventEmitter<void>();

	constructor(public firebase : FirebaseService, private afAuth: AngularFireAuth){
		afAuth.setPersistence('local');
		}

	ngOnInit(): void {
		this.firebase.setAuthenticated(this.afAuth.currentUser !== null);
	}

	getUser() {
		const user = this.afAuth.currentUser;
		// return this.firebase.object("users/"+user?.uid);
	  }

	login() {
		if(this.loginEmail == '') {
		  alert('Please enter email');
		  return;
		}
	
		if(this.loginPassword == '') {
		  alert('Please enter password');
		  return;
		}
	
		this.firebase.login(this.loginEmail,this.loginPassword);
		
		
		this.loginEmail = '';
		this.loginPassword = '';
	
	  }

// 	  register() {
// 		if(this.registerEmail == '') {
// 		  alert('Please enter email');
// 		  return;
// 		}
	
// 		if(this.registerPassword == '') {
// 		  alert('Please enter password');
// 		  return;
// 		}
	
// 		this.firebase.registrazione(this.registerEmail,this.registerPassword);
		
// 		this.registerEmail = '';
// 		this.loginPassword = '';

	
// 	  }

// 	  toggleRegistrato() {
// 		this.seiregistrato = !this.seiregistrato;
// 	  }

}

