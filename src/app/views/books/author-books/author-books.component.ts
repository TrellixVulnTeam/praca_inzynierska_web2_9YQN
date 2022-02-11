import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { BookModel } from 'src/app/models/books/book.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent implements OnInit {
  responder: ResponderModel | any = new ResponderModel;
  books: BookModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe()
  }

  getBookListByAuthor(id: string){
    return this.bookService
      .getBookListByAuthorId(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.books = this.responder.object;
        } else {
          this.toastr.show(this.responder.message);
        }
      }, error => {
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }


}
