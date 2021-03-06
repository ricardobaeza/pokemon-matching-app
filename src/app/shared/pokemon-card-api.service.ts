import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonCardApiService {
  cardSets: any;
  constructor(private http: HttpClient) { }

  getCards(set: string): Observable<any> {
    return this.http.get('https://api.pokemontcg.io/v1/cards?setCode=' + set);
  }


  cardSet() {
    return this.http.get('https://api.pokemontcg.io/v1/sets')
  }

}
