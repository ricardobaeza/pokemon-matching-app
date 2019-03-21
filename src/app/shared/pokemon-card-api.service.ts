import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonCardApiService {

  constructor(private http: HttpClient) { }

  getCards(): Observable<any> {
    return this.http.get('https://api.pokemontcg.io/v1/cards');
  }

}
