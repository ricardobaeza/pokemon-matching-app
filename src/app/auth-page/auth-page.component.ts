import {Component, NgZone, OnInit} from '@angular/core';
import { AngularFireService} from '../shared/angular-fire-service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  constructor(private afs: AngularFireService,
              private router: Router,
              private zone: NgZone) { }

  ngOnInit() {
  }

  logIn () {
    this.afs.logIn().then(data => {
      this.zone.run(()=> {
        this.router.navigate(['/game-setup'])
      })
    })
  }



}
