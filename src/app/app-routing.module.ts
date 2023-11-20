import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabComponent } from "./componenti/tab/tab.component";
import { PageNotFoundComponent } from "./componenti/page-not-found/page-not-found.component";
import { FormInserireDiscoComponent } from "./componenti/form-inserire-disco/form-inserire-disco.component";
import { PaginaDiscoComponent } from "./componenti/pagina-disco/pagina-disco.component";
import { PaginaPreferitiComponent } from "./componenti/pagina-preferiti/pagina-preferiti.component";
import { PageInsertDiskComponent } from "./componenti/page-insert-disk/page-insert-disk.component";
import { LoginMaterialComponent } from "./componenti/login-material/login-material.component";
import { DashboardComponent } from "./componenti/dashboard/dashboard.component";
import { RegistrazioneComponent } from "./componenti/registrazione/registrazione.component";
import { AboutusComponent } from "./componenti/aboutus/aboutus.component";
// import { AuthGuard } from "./auth.guard";

const routes: Routes = [
	{ path: "", component: TabComponent, pathMatch: "full"  },
	{ path: "preferiti", component: PaginaPreferitiComponent},
	{ path: "page" , component: PaginaDiscoComponent},
	{ path: "login", component: LoginMaterialComponent},
	{ path: 'dashboard', component: DashboardComponent},
	{ path: "add-disk", component: PageInsertDiskComponent },
	{ path: "registrati", component: RegistrazioneComponent},
	{ path: 'dashboard', component: DashboardComponent},
	{ path: 'about', component: AboutusComponent},	
	// QUESTA WILDCARD DEVE ESSERE L'ULTIMA DI DEFAULT
	{ path: "**", component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
