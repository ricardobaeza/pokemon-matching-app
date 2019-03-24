import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameSetupService {
  numberOfPlayers: number = 0;
  constructor() { }

  logValue (event) {
    console.log(event)
  }
}
