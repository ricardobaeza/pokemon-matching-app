import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { ToolbarComponent } from '../toolbar/toolbar.component';
@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  allUserData: object[] = [];
  localCurrentUser;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore,
              private toolbar: ToolbarComponent) { }

  logIn () {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }


  logOut () {
    this.afAuth.auth.signOut();
    this.router.navigate(['auth-page']);

  }
  // this gets all the users in the db

  getAllUsers() {
     this.afs.collection('Player-info').get().subscribe(documents => {
       documents.forEach(doc => {
         this.allUserData.push({user: doc.data(), docId: doc.id});

       })
     })
}

  logCurrentUser () {
    return this.afAuth.auth.currentUser
  }

  makeNewUser() {
    let afUser = this.afAuth.auth.currentUser;
    let foundName: number = 0;
    console.log(this.afAuth.auth.currentUser.displayName);
    for( let index of this.allUserData) {
      // @ts-ignore
      if (index.user.name === this.afAuth.auth.currentUser.displayName) {
        foundName++;
        console.log('user found');
        this.localCurrentUser = index;
        this.toolbar.setUser(afUser)
      }
    }
    if (foundName === 0) {
      console.log('user is not present in database, created new user');
      this.afs.collection('Player-info').add({name: afUser.displayName,
                                                    email: afUser.email,
                                                    imageUrl: afUser.photoURL,
                                                    NumberOfGamesWon: 0,
                                                    NumberOfGamesLost: 0,
                                                    BeatenOpponents: [],
                                                    LostTo: [],
                                                    });
    }
  }

  getCurrentUserId():string {
    return
  }


}
