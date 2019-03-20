import { Component, OnInit } from '@angular/core';
import {AngularFireService} from '../shared/angular-fire-service.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

  constructor(private afs:  AngularFireService) { }

  ngOnInit() {
    console.log('hello');
    console.log(this.afs.logCurrentUser());

  }

}
