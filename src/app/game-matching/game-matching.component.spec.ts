import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMatchingComponent } from './game-matching.component';

describe('GameMatchingComponent', () => {
  let component: GameMatchingComponent;
  let fixture: ComponentFixture<GameMatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMatchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
