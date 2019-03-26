import { Component, OnInit } from '@angular/core';
import { PokemonCardApiService } from '../shared/pokemon-card-api.service';

@Component({
  selector: 'app-game-matching',
  templateUrl: './game-matching.component.html',
  styleUrls: ['./game-matching.component.css']
})
export class GameMatchingComponent implements OnInit {

  isLoaded = false;
  canSelect = true;
  cards: Object[] = [];
  pairCount: number;

  card1: Object = null;
  card2: Object = null;
  card1Element = null;
  card2Element = null;

  players: Object[];
  activePlayer = 0;

  result = 'Select 2 cards...';

  constructor(private pokemonService: PokemonCardApiService) {
  }

  ngOnInit() {
    // players = gameData.players
    this.players = [
      {name: 'Ricky Baeza', score: 0},
      {name: 'Berkley Horan', score: 0},
    ];
    this.pokemonService.getCards().subscribe(data => {

      for (let i = 0; i < 5 /* How many cards to get */; i++) {
        this.cards.push(data['cards'][i]);
      }
      this.startGame();
    });
  }

  startGame() {
    this.pairCount = this.cards.length;
    console.log(this.cards);
    this.isLoaded = true;
  }

  reset() {
    this.card1Element = null;
    this.card2Element = null;
    this.card1 = null;
    this.card2 = null;
    if (this.pairCount === 0) {
      this.endGame();
    } else {
      this.result = 'Select 2 cards';
      this.canSelect = true;
    }
  }

  rotatePlayer() {
    if (this.activePlayer >= (this.players.length - 1)) {
      this.activePlayer = 0;
    } else {
      this.activePlayer++;
    }
  }

  revealCard(card, cardData: Object) {
    this.animateObject(card, 'spin');

    if (!this.card1) {
      this.card1 = cardData;
      card.setAttribute('selected', 1);
      this.card1Element = card;
    } else if (!this.card2) {
      this.card2 = cardData;
      card.setAttribute('selected', 2);
      this.card2Element = card;
    }

    // The timeout needs to wait exactly half the length of the css animation!
    setTimeout(() => {
      card.setAttribute('src', cardData['imageUrl']);
      this.matchCards();
    }, 500);
  }

  hideCard(card) {
    this.animateObject(card, 'spin');

    // The timeout needs to wait exactly half the length of the css animation!
    setTimeout(() => {
      card.setAttribute('src', 'assets/card.jpg');
    }, 500);

    if (card.getAttribute('selected')) {
      this['card' + card.getAttribute('selected')] = null;
    }
  }

  matchCards() {
    if (this.card1 && this.card2) {
      this.canSelect = false;
      if (this.card1['id'] === this.card2['id']) {
        this.result = `It's a match!`;
        setTimeout(() => {
          let elem = this.card1Element;
          elem.parentNode.removeChild(elem);
          let elem2 = this.card2Element;
          elem2.parentNode.removeChild(elem2);
          this.players[this.activePlayer]['score'] += 1;
          this.rotatePlayer();
          this.pairCount --;
          this.reset();
        }, 1500);
      } else {
        this.result = `Not a match, try again...`;
        setTimeout(() => {
          this.hideCard(this.card1Element);
          this.hideCard(this.card2Element);
          this.rotatePlayer();
          this.reset();
        }, 1500);
      }
    }
  }

  animateObject(object, animation: string) {
    if (animation === 'spin') {
      object.classList.add('card-spin');
      // This timeout needs to wait the exact same length of the css animation!
      setTimeout(() => {
        object.classList.remove('card-spin');
      }, 1000);
    } else {
      throw 'No animation provided!';
    }
  }

  toggleCard(event, cardData: Object) {
    let card = event.target;

    if (card.classList.contains('card-spin') || !this.canSelect) {
      return;
    }

    let src = card.getAttribute('src');

    if (src === 'assets/card.jpg') {
      this.revealCard(card, cardData);
    } else {
      this.hideCard(card);
    }
  }

  endGame() {
    alert('Game Ended!');
  }

}
