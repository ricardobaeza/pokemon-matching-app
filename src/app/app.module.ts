import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatDialogModule,
  MatProgressSpinnerModule,

} from '@angular/material';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {RouterModule, Routes} from '@angular/router';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GameMatchingComponent } from './game-matching/game-matching.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { CreditsComponent } from './credits/credits.component';

export const appRoutes: Routes = [
  { path: 'auth-page', component: AuthPageComponent },
  { path: 'game-setup', component: GameSetupComponent},
  { path: '', component: AuthPageComponent},
  { path: 'game', component: GameMatchingComponent },
  { path: 'stats', component: PlayerStatsComponent},
  { path: 'credits', component: CreditsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    ToolbarComponent,
    GameSetupComponent,
    GameMatchingComponent,
    PlayerStatsComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot( appRoutes,
          {enableTracing: false}),
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [ToolbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

