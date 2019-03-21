import {Component, OnInit} from '@angular/core';
import {PokemonCardApiService} from '../shared/pokemon-card-api.service';

@Component({
  selector: 'app-game-matching',
  templateUrl: './game-matching.component.html',
  styleUrls: ['./game-matching.component.css']
})
export class GameMatchingComponent implements OnInit {

  isLoaded = false;
  cards: Object[] = [];
  selectedCards = {
    card1: null,
    card2: null,
  };
  result = 'Select 2 cards...';

  constructor(private pokemonService: PokemonCardApiService) {
  }

  ngOnInit() {
    this.pokemonService.getCards().subscribe(data => {

      for (let i = 0; i < 5 /* How many cards to get */; i++) {
         this.cards.push(data['cards'][i]);
      }
      this.startGame();
    });
  }

  startGame() {
    console.log(this.cards);
    this.isLoaded = true;
  }

  revealCard(card, cardData: Object) {
    this.animateObject(card, 'spin');

    // The timeout needs to wait exactly half the length of the css animation!
    setTimeout(() => {
      card.setAttribute('src', cardData['imageUrl']);
    }, 500);

    if (!this.selectedCards.card1) {
      this.selectedCards.card1 = cardData;
      this.selectedCards.card1.element = card;
      card.selected = 1;
    } else if (!this.selectedCards.card2) {
      this.selectedCards.card2 = cardData;
      this.selectedCards.card2.element = card;
      card.selected = 2;
    }
    this.matchCards();
  }

  hideCard(card) {
    this.animateObject(card, 'spin');

    // The timeout needs to wait exactly half the length of the css animation!
    setTimeout(() => {
      card.setAttribute('src', 'assets/card.jpg');
    }, 500);

    if (card.selected) {
      console.log(card.selected);
      this.selectedCards['card' + card.selected] = null;
    }
    this.matchCards();
  }

  matchCards () {
    if (this.selectedCards.card1 && this.selectedCards.card2) {
      console.log(this.selectedCards);
      if (this.selectedCards.card1['id'] === this.selectedCards.card2['id']) {
        this.result = `It's a match!`;
        setTimeout(() => {
          let elem = this.selectedCards.card1.element;
          elem.parentNode.removeChild(elem);
          let elem2 = this.selectedCards.card2.element;
          elem2.parentNode.removeChild(elem);
        }, 1500);
      } else {
        this.result = `Not a match, try again...`;
        setTimeout(() => {
          this.hideCard(this.selectedCards.card1.element);
          this.hideCard(this.selectedCards.card2.element);
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

    if (card.classList.contains('card-spin')) {
      return;
    }

    let src = card.getAttribute('src');

    if (src === 'assets/card.jpg') {
      this.revealCard(card, cardData);
    } else {
      this.hideCard(card);
    }
  }

}
