import { Component, OnInit } from '@angular/core';
import {AngularFireService} from '../shared/angular-fire-service.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms'
import { GameSetupService } from '../shared/game-setup.service';
import { PokemonCardApiService } from '../shared/pokemon-card-api.service';
import { GameData } from '../models/gameInfo';
@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {
  gameForm: FormGroup;
  playersArray = this.afs.allUserData

  cardSets;
  
  constructor(private afs:  AngularFireService,
              public gameService: GameSetupService,
              public pokemonCardService: PokemonCardApiService,
              private formBuilder: FormBuilder) {
                this.gameForm = this.createFormGroup(formBuilder)
               }

  ngOnInit() {
    console.log(this.afs.logCurrentUser());
    console.log(this.playersArray)
    this.getSet();

  }
  getSet() {
    this.pokemonCardService.cardSet().subscribe((data)=> {
      this.cardSets = data['sets'];
      console.log(this.cardSets);
    })
  }

  createFormGroup (formBuilder: FormBuilder) {
    return formBuilder.group({
      gameData: formBuilder.group({
        numberOfPlayers: 0,
        players: [],
        cardSet: ''
      })
    })
  }

  onSubmit() {
    const result = Object.assign({}, this.gameForm.value);
      result.gameData = Object.assign({}, result.gameData);
      
      console.log(result);
  }

}
