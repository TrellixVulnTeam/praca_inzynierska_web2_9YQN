import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorApproveGuard } from 'src/app/guard/authors/author-approve.guard';
import { AuthorSoftDeleteGuard } from 'src/app/guard/authors/author-soft-delete.guard';
import { AuthorUpdateGuard } from 'src/app/guard/authors/author-update.guard';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { ApproveAuthorComponent } from 'src/app/views/authors/approve-author/approve-author/approve-author.component';
import { ApproveAuthorsComponent } from 'src/app/views/authors/approve-authors/approve-authors.component';
import { AuthorComponent } from 'src/app/views/authors/author/author/author.component';
import { AuthorsComponent } from 'src/app/views/authors/authors/authors/authors.component';
import { DeleteAuthorComponent } from 'src/app/views/authors/delete-author/delete-author/delete-author.component';
import { EditAuthorComponent } from 'src/app/views/authors/edit-author/edit-author/edit-author.component';
import { NewAuthorComponent } from 'src/app/views/authors/new-author/new-author/new-author.component';

const routes: Routes = [
  {path: '', children: [
    {path: '', component: AuthorsComponent},
    {path: 'author/:id', component: AuthorComponent},
    {path: 'approve', component: ApproveAuthorsComponent, canActivate: [LoginGuard, AuthorApproveGuard]},
    {path: 'approve/:id', component: ApproveAuthorComponent, canActivate: [LoginGuard, AuthorApproveGuard]},
    {path: 'new-author', component: NewAuthorComponent, canActivate: [LoginGuard]},
    {path: 'edit-author', component: EditAuthorComponent, canActivate: [LoginGuard, AuthorUpdateGuard]},
    {path: 'delete-author/:id', component: DeleteAuthorComponent, canActivate: [LoginGuard, AuthorSoftDeleteGuard]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
