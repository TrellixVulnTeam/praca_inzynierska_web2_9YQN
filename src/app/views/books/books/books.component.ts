import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { BookModel } from 'src/app/models/books/book.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { BookService } from 'src/app/services/book/book.service';
import { PermissionService } from 'src/app/services/permissions/permission.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  responder: ResponderModel = new ResponderModel;
  books: BookModel[] = [new BookModel];

  canApprove: boolean = this.userHasPermission('Book.Approve');
  canEdit: boolean = this.userHasPermission('Book.Update');
  canDelete: boolean = this.userHasPermission('Book.SoftDelete');

  constructor(
    private bookService: BookService,
    private permissionService: PermissionService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getBookModel();
  }

  getBookModel(){
    return this.bookService
      .getAllBooks()
      .pipe(first())
      .subscribe(response =>{
        this.responder = response;
        if(this.responder.object != null){
          this.books = this.responder.object;
        }
        else{
          this.toastr.show(this.responder.message);
        }
      }, error =>{
        console.log(`HttpError: ${error}`);
      })
  }

  userHasPermission(hasPermission: string):boolean{
    return this.permissionService.isPermited(hasPermission);
  }

}
