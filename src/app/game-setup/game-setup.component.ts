import { Component, OnInit } from '@angular/core';
import {AngularFireService} from '../shared/angular-fire-service.service';
import { FormControl } from '@angular/forms'
import { GameSetupService } from '../shared/game-setup.service';
import { PokemonCardApiService } from '../shared/pokemon-card-api.service';
@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {
  playersArray = this.afs.allUserData
  name = new FormControl('');
  selectedPlayers = new FormControl('');
  constructor(private afs:  AngularFireService,
              public gameService: GameSetupService,
              public pokemonCardService: PokemonCardApiService) { }

  ngOnInit() {
    console.log(this.afs.logCurrentUser());
    console.log(this.playersArray)
    this.pokemonCardService.logger();

  }

  logger() {
    console.log(this.name.value)
  }

}
