import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  responder: ResponderModel | any;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data =>{
        this.deleteBook(data.id);
      })
  }

  private deleteBook(id: string){
    return this.bookService
      .deleteBook(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.succes){
          this.toastr.show("Książka została usunięta");
        } else{
          this.toastr.show(this.responder.message);
        }
        this.navigateTo();
      },error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
        this.navigateTo();
      });
  }

  private navigateTo(){
    this.router.navigate(['/books']);
  }
}
