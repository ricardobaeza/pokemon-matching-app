import { Component, OnInit } from '@angular/core';
import {AngularFireService} from '../shared/angular-fire-service.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { GameSetupService } from '../shared/game-setup.service';
import { PokemonCardApiService } from '../shared/pokemon-card-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {
  gameForm: FormGroup;
  playersArray = this.afs.allUserData;

  cardSets;
  
  constructor(private afs:  AngularFireService,
              public gameService: GameSetupService,
              public pokemonCardService: PokemonCardApiService,
              private formBuilder: FormBuilder,
              private router: Router) {
                this.gameForm = this.createFormGroup(formBuilder)
               }

  ngOnInit() {
    this.getSet();
    console.log(this.afs.localCurrentUser);
  }
  getSet() {
    this.pokemonCardService.cardSet().subscribe((data)=> {
      //@ts-ignore
      this.cardSets = data.sets;
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
      localStorage.setItem('gameData', result);
      this.router.navigate(['/game'])
      
  }

}
