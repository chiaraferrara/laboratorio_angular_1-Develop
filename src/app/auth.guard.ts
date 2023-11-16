// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// import { FirebaseService } from './servizi/firebase.service';


// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private firebase: FirebaseService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean | UrlTree {
//     if (this.firebase.isAuthenticated) {
//       // L'utente è autenticato, consente l'accesso alla route
//       return true;
//     } else {
//       // L'utente non è autenticato, reindirizza alla pagina di login
//       return this.router.createUrlTree(['/login']);
//     }
//   }
// }
