import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
 

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterCeptor } from './auth/auth.interceptor';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './players/player/player.component';
import { PlayerService } from './shared/player.service';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamService } from './shared/team.service';
import { TeamsService } from './shared/teams.service';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';
import { GamesComponent } from './games/games.component';
import { GameCreateComponent } from './games/game-create/game-create.component';
import { GamesService } from './shared/games.service';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { AdminComponent } from './admin/admin.component';
import { UserCreateComponent } from './admin/user-create/user-create.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    PlayersComponent,
    PlayerComponent,
    TeamsComponent,
    TeamComponent,
    TeamEditComponent,
    TeamDetailsComponent,
    GamesComponent,
    GameCreateComponent,
    GameEditComponent,
    GameDetailsComponent,
    AdminComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserEditComponent,
    PlayerEditComponent,
    PlayerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({}),
    MatDialogModule
  ],
  entryComponents : [PlayerComponent,TeamComponent, TeamEditComponent],
  providers: [UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterCeptor,
    multi: true
  },
    PlayerService,
    TeamService,
    GamesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
