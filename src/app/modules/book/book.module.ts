import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material/material.module';
import { BooksComponent } from 'src/app/views/books/books/books.component';
import { BookComponent } from 'src/app/views/books/book/book.component';
import { ApproveBooksComponent } from 'src/app/views/books/approve-books/approve-books.component';
import { ApproveBookComponent } from 'src/app/views/books/approve-book/approve-book.component';
import { ListBooksComponent } from 'src/app/views/books/list-books/list-books.component';
import { NewBookComponent } from 'src/app/views/books/new-book/new-book.component';
import { EditBookComponent } from 'src/app/views/books/edit-book/edit-book.component';
import { DeleteBookComponent } from 'src/app/views/books/delete-book/delete-book.component';
import { BookService } from 'src/app/services/book/book.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { PublisherService } from 'src/app/services/publisher/publisher.service';
import { BookAproveGuard } from 'src/app/guard/books/book-aprove.guard';
import { BookSoftDeleteGuard } from 'src/app/guard/books/book-soft-delete.guard';
import { BookUpdateGuard } from 'src/app/guard/books/book-update.guard';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { AuthorBooksComponent } from 'src/app/views/books/author-books/author-books.component';
import { CategoryBooksComponent } from 'src/app/views/books/category-books/category-books.component';
import { PublisherBooksComponent } from 'src/app/views/books/publisher-books/publisher-books.component';
import { ImageCoverService } from 'src/app/services/image-cover/image-cover.service';
import { CommentsComponent } from 'src/app/views/comments/comments/comments.component';
import { NewCommentComponent } from 'src/app/views/comments/new-comment/new-comment.component';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentDeleteGuard } from 'src/app/guard/comments/comment-delete.guard';
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';


@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,

    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    BooksComponent,
    BookComponent,
    ApproveBooksComponent,
    ApproveBookComponent,
    ListBooksComponent,
    NewBookComponent,
    EditBookComponent,
    DeleteBookComponent,
    AuthorBooksComponent,
    CategoryBooksComponent,
    PublisherBooksComponent,
    CommentsComponent,
    NewCommentComponent,
  ],
  providers: [
    authInterceptorProviders,
    BookService,
    CategoryService,
    LanguageService,
    PublisherService,
    SettingsService,
    ImageCoverService,
    CommentService,

    LoginGuard,
    BookAproveGuard,
    BookSoftDeleteGuard,
    BookUpdateGuard,
    CommentDeleteGuard
  ]
  
})
export class BookModule { }
