import {Component, NgZone, OnInit} from '@angular/core';
import { AngularFireService} from '../shared/angular-fire-service.service';
import { Router} from '@angular/router';
import {auth} from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  constructor(private afs: AngularFireService,
              private router: Router,
              private zone: NgZone,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afs.getAllUsers();
  }

  logIn () {
    this.afs.logIn().then(data => {
      this.zone.run(()=> {
        console.log(this.afs.logCurrentUser());
        this.afs.makeNewUser();
        this.router.navigate(['/game-setup']);
      })
    })
  }



}
