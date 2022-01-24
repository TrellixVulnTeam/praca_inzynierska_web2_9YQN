import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { MyProfileComponent } from 'src/app/views/user/my-profile/my-profile/my-profile.component';
import { ProfileComponent } from 'src/app/views/user/profile/profile/profile.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'me', component: MyProfileComponent, canActivate: [LoginGuard]},
    {path: 'user/:id', component: ProfileComponent, canActivate: [LoginGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
