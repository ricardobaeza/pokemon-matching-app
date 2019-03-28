import {Component, OnInit} from '@angular/core';
import {PokemonCardApiService} from '../shared/pokemon-card-api.service';
import { AngularFireService } from '../shared/angular-fire-service.service';

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

  constructor(private pokemonService: PokemonCardApiService,
              private afs: AngularFireService) {
  }

  ngOnInit() {
    let gameData = JSON.parse(localStorage.getItem('gameData'))['gameData'];
    this.players = gameData.players;
    for (let i = 0; i < this.players.length; i++) {
      this.players[i]['user'].score = 0;
    }

    this.pokemonService.getCards(gameData.cardSet).subscribe(data => {
      let amount = 0;
      console.log(this.players);
      if (gameData['gameSize'] === 'small') {
        amount = this.players.length * 2;
      } else if (gameData['gameSize'] === 'large') {
        amount = this.players.length * 4;
      }
      // Small game size = player length * 2
      // Large game size = player length * 4
      for (let i = 0; i < amount; i++) {
        // It's added in twice so that there are pairs
        this.cards.push(data['cards'][i]);
        this.cards.push(data['cards'][i]);
      }

      this.pairCount = this.cards.length / 2;

      this.cards = this.shuffle(this.cards);

      // This loop ensures that 5 cards appear on a row and are positioned properly
      for (let i = 0; i < this.cards.length % 5; i++) {
        this.cards.push({emptyCard: true});
      }

      this.startGame();
    });
    console.log(this.afs.localCurrentUser);
  }

  startGame() {
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

  shuffle (cards: Object[]) {
    let currentIndex = cards.length;
    let temp, rand;

    while (0 !== currentIndex) {
      rand = Math.floor(Math.random() * currentIndex);
      currentIndex --;

      temp = cards[currentIndex];
      cards[currentIndex] = cards[rand];
      cards[rand] = temp;
    }

    return cards;
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
      this.result = "Select 1 more card...";
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
    if (this.canSelect) {
      this.animateObject(card, 'spin');

      // The timeout needs to wait exactly half the length of the css animation!
      setTimeout(() => {
        card.setAttribute('src', 'assets/card.jpg');
      }, 500);

      if (card.getAttribute('selected')) {
        this['card' + card.getAttribute('selected')] = null;
      }
    }
  }

  matchCards() {
    if (this.card1 && this.card2) {
      this.canSelect = false;
      if (this.card1['id'] === this.card2['id']) {
        this.result = `It's a match!`;
        let elem = this.card1Element;
        let elem2 = this.card2Element;
        this.animateObject(elem, 'fade');
        this.animateObject(elem2, 'fade');
        setTimeout(() => {
          elem.parentNode.removeChild(elem);
          elem2.parentNode.removeChild(elem2);
          this.players[this.activePlayer]['user']['score'] += 1;
          this.rotatePlayer();
          this.pairCount--;
          this.reset();
        }, 1500);
      } else {
        this.result = `Not a match, try again...`;
        setTimeout(() => {
          this.canSelect = true;
          this.hideCard(this.card1Element);
          this.hideCard(this.card2Element);
          this.reset();
          this.rotatePlayer();
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
    } else if (animation === 'fade') {
      setTimeout(() => {
        object.classList.add('card-fade');
      }, 500);
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
    if (this.players.length > 1) {
      let winnerIndex = 0;
      let tie = false;
      for (let i = 1; i < this.players.length; i++) {
        if (this.players[i]['user']['score'] > this.players[winnerIndex]['user']['score']) {
          winnerIndex = i;
        } else if (this.players[i]['user']['score'] === this.players[winnerIndex]['user']['score']) {
          // It's a tie
          tie = true;
        }
      }

      if (tie) {
        alert("It's a tie!");
      } else {
        alert(`The winner is ${this.players[winnerIndex]['user']['name']} with a score of ${this.players[winnerIndex]['user']['score']}!`);
      }

      // Do win/lose counter changes on the user
    } else {
      alert("Game ended with a score of " + this.players[0]['user']['score']);
    }

  }

}
