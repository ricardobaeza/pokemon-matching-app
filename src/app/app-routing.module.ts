import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameMatchingComponent } from './game-matching/game-matching.component';

const routes: Routes = [
  { path: 'game', component: GameMatchingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
