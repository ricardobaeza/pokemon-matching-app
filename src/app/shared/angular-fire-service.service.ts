import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  constructor(public afAuth: AngularFireAuth,
              private  router: Router) { }

  logIn () {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  logOut () {
    this.afAuth.auth.signOut();
    this.router.navigate(['auth-page']);


  }
}
