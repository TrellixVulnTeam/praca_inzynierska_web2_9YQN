import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './guard/can-deactivate/can-deactivate-guard';


import { MainComponent } from './views/main/main/main/main.component';
import { LoginComponent } from './views/user/login/login/login.component';

import { RegisterComponent } from './views/user/register/register/register.component';


const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent, canDeactivate: [CanDeactivateGuard]},
  {path: 'register', component: RegisterComponent, canDeactivate: [CanDeactivateGuard]},


  {path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)},
  {path: 'authors', loadChildren: () => import('./modules/author/author.module').then(m => m.AuthorModule)},
  {path: 'categories', loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule)},
  
  ];
  

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
