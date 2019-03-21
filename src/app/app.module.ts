import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'

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

} from '@angular/material';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {RouterModule, Routes} from '@angular/router';
import { GameSetupComponent } from './game-setup/game-setup.component';

const appRoutes: Routes = [
  { path: 'auth-page', component: AuthPageComponent },
  { path: 'game-setup', component: GameSetupComponent},
  { path: '', component: AuthPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    ToolbarComponent,
    GameSetupComponent
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
    RouterModule.forRoot( appRoutes,
          {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

