import { TestBed } from '@angular/core/testing';

import { PokemonCardApiService } from './pokemon-card-api.service';

describe('PokemonCardApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonCardApiService = TestBed.get(PokemonCardApiService);
    expect(service).toBeTruthy();
  });
});
