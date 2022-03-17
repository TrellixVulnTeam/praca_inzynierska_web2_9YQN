import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { MaterialModule } from '../material/material/material.module';
import { AuthorsComponent } from 'src/app/views/authors/authors/authors/authors.component';
import { AuthorComponent } from 'src/app/views/authors/author/author/author.component';
import { ApproveAuthorsComponent } from 'src/app/views/authors/approve-authors/approve-authors.component';
import { ApproveAuthorComponent } from 'src/app/views/authors/approve-author/approve-author/approve-author.component';
import { NewAuthorComponent } from 'src/app/views/authors/new-author/new-author/new-author.component';
import { EditAuthorComponent } from 'src/app/views/authors/edit-author/edit-author/edit-author.component';
import { DeleteAuthorComponent } from 'src/app/views/authors/delete-author/delete-author/delete-author.component';
import { AuthorService } from 'src/app/services/author/author.service';
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { AuthorSoftDeleteGuard } from 'src/app/guard/authors/author-soft-delete.guard';
import { AuthorApproveGuard } from 'src/app/guard/authors/author-approve.guard';
import { AuthorUpdateGuard } from 'src/app/guard/authors/author-update.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    AuthorsComponent,
    AuthorComponent,
    ApproveAuthorsComponent,
    ApproveAuthorComponent,
    NewAuthorComponent,
    EditAuthorComponent,
    DeleteAuthorComponent,
  ],
  providers: [
    authInterceptorProviders,
    AuthorService,

    LoginGuard,
    AuthorApproveGuard,
    AuthorUpdateGuard,
    AuthorSoftDeleteGuard,
    
  ]
})
export class AuthorModule { }
