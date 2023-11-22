
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabComponent } from "./componenti/tab/tab.component";
import { PageNotFoundComponent } from "./componenti/page-not-found/page-not-found.component";
import { NavbarComponent } from "./componenti/navbar/navbar.component";
import { CaroselloComponent } from "./componenti/carosello/carosello.component";
import { FooterComponent } from "./componenti/footer/footer.component";
import { NgModule } from '@angular/core';
import { PaginaDiscoComponent } from "./componenti/pagina-disco/pagina-disco.component";
import { PaginaPreferitiComponent } from "./componenti/pagina-preferiti/pagina-preferiti.component";
import { CommentiComponent } from "./componenti/commenti/commenti.component";
import { LoginMaterialComponent } from "./componenti/login-material/login-material.component";
import { PageInsertDiskComponent } from "./componenti/page-insert-disk/page-insert-disk.component";
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from "src/environments/environment";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component'
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormInserireDiscoComponent } from "./componenti/form-inserire-disco/form-inserire-disco.component";
import { FormsModule } from "@angular/forms";
import { UserService } from "./servizi/user.service";
import { ProfilePictureComponent } from './componenti/profile-picture/profile-picture.component';
import { AboutusComponent } from './componenti/aboutus/aboutus.component';
import { MatTabsModule } from "@angular/material/tabs";


@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		PageNotFoundComponent,
		NavbarComponent,
		CaroselloComponent, PaginaDiscoComponent, FooterComponent, PaginaPreferitiComponent,
		CommentiComponent, RegistrazioneComponent, LoginMaterialComponent, PageInsertDiskComponent, DashboardComponent, ProfilePictureComponent, AboutusComponent,TabComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatTabsModule,
		AppRoutingModule,
		FormInserireDiscoComponent,
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		FormsModule
	],
	providers: [AngularFirestore, UserService, TabComponent],
})
export class AppModule { }
