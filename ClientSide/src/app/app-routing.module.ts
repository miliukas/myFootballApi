import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './players/player/player.component';


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
    path:'player', component:PlayersComponent,
    children:[
      {path:'', component:PlayerComponent},
      {path:'edit/:id', component:PlayerComponent}
    ]
  },
  {path:'home', component: HomeComponent} //, canActivate:[AuthGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
