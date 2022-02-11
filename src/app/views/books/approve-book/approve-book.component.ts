import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-approve-book',
  templateUrl: './approve-book.component.html',
  styleUrls: ['./approve-book.component.css']
})
export class ApproveBookComponent implements OnInit {
  responder = new ResponderModel;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data => {
        this.approveBook(data.id);
      });
  }

  private approveBook(id: string){
    return this.bookService
      .approveBook(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.success){
          this.toastr.show("Książka została zaakceptowana")
          this.navigateToApproveBooks();
        } else {
          this.toastr.show("Przepraszamy wystąpił problem");
          this.navigateToApproveBooks();
        }
      }, error => {
        console.log(`HttpError ${JSON.stringify(error)}`);
        this.toastr.show("Przepraszamy wystąpił problem");
        this.navigateToApproveBooks();
      });
  }

  private navigateToApproveBooks(){
    this.router.navigate(['/books/approves']);
  }

}
