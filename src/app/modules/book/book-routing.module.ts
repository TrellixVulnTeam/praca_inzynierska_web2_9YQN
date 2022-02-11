import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAproveGuard } from 'src/app/guard/books/book-aprove.guard';
import { BookSoftDeleteGuard } from 'src/app/guard/books/book-soft-delete.guard';
import { BookUpdateGuard } from 'src/app/guard/books/book-update.guard';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { ApproveBooksComponent } from 'src/app/views/books/approve-books/approve-books.component';
import { AuthorBooksComponent } from 'src/app/views/books/author-books/author-books.component';
import { BookComponent } from 'src/app/views/books/book/book.component';
import { BooksComponent } from 'src/app/views/books/books/books.component';
import { CategoryBooksComponent } from 'src/app/views/books/category-books/category-books.component';
import { DeleteBookComponent } from 'src/app/views/books/delete-book/delete-book.component';
import { EditBookComponent } from 'src/app/views/books/edit-book/edit-book.component';
import { ListBooksComponent } from 'src/app/views/books/list-books/list-books.component';
import { NewBookComponent } from 'src/app/views/books/new-book/new-book.component';
import { PublisherBooksComponent } from 'src/app/views/books/publisher-books/publisher-books.component';

const routes: Routes = [
  {path: '', children: [
    {path: '', component: BooksComponent},
    {path: 'list-books/:id', component: ListBooksComponent},
    {path: 'list-author-books/:id', component: AuthorBooksComponent},
    {path: 'list-category-books/:id', component: CategoryBooksComponent},
    {path: 'list-publisher-books/:id', component: PublisherBooksComponent},
    {path: 'book/:id', component: BookComponent},
    {path: 'approves', component: ApproveBooksComponent, canLoad: [LoginGuard, BookAproveGuard]},
    {path: 'approve/:id', component: ApproveBooksComponent, canLoad: [LoginGuard, BookAproveGuard]},
    {path: 'new-book', component: NewBookComponent, canLoad: [LoginGuard]},
    {path: 'edit/:id', component: EditBookComponent, canLoad: [LoginGuard, BookUpdateGuard]},
    {path: 'delete/:id', component: DeleteBookComponent, canLoad: [LoginGuard, BookSoftDeleteGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
