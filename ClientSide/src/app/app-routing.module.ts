import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './players/player/player.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { TeamDetailsComponent } from './teams/team-details/team-details.component';
import { GamesComponent } from './games/games.component';
import { GameCreateComponent } from './games/game-create/game-create.component';
import { GameEditComponent } from './games/game-edit/game-edit.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { AdminComponent } from './admin/admin.component';
import { UserCreateComponent } from './admin/user-create/user-create.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'}, //user/login
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent}, /*user/register*/
      { path: 'login', component: LoginComponent} /*user/login*/
    ]
  },

  {path:'players', component:PlayersComponent},
  {
    path:'player', children:[
      {path:'', component:PlayerComponent},
      {path:'edit/:id', component:PlayerEditComponent},
      {path:'details/:id', component:PlayerDetailsComponent}
    ]
  },

  {path:'teams', component:TeamsComponent},
  {
    path:'team',children:[
      {path:'', component:TeamComponent},
      {path:'edit/:id', component:TeamEditComponent},
      {path:'details/:id', component:TeamDetailsComponent}
    ]
  },

  {path:'games', component : GamesComponent},
  {
    path:'game',children:[
      {path:'', component:GameCreateComponent},
      {path:'edit/:id', component:GameEditComponent},
      {path:'details/:id', component:GameDetailsComponent}
    ]
  },

  {path:'adminpanel', component : AdminComponent, canActivate:[AuthGuard]},
  {
    path:'user',children:[
      {path:'', component:UserCreateComponent, canActivate:[AuthGuard]},
      {path:'edit/:id', component:UserEditComponent , canActivate:[AuthGuard]},
      {path:'details/:id', component: UserDetailsComponent, canActivate:[AuthGuard]}
    ]
  },

  {path:'home', component: HomeComponent} //, canActivate:[AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
