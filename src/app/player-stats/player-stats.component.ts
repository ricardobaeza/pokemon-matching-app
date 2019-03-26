import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireService } from '../shared/angular-fire-service.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {
  localCurrentUser = this.afs.localCurrentUser;
  constructor(private afs: AngularFireService) { }

  ngOnInit() {
    console.log(this.afs.localCurrentUser)
  }

}
