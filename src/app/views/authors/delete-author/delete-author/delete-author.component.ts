import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { AuthorService } from 'src/app/services/author/author.service';

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.css']
})
export class DeleteAuthorComponent implements OnInit {

  authorId: string = '';
  respond = new ResponderModel;

  constructor(
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(data => {
      this.authorId = data.id;
    });

    this.deleteAuthor(this.authorId);
  }

  deleteAuthor(id: string){
    return this.authorService
      .softDeleteAuthor(id)
      .pipe(first())
      .subscribe(responder =>{
        this.toastr.show("Autor został usunięty");
        this.router.navigate(['/authors']);
      },
      error =>{
        console.log(JSON.stringify(error));
        this.router.navigate(['/authors']);
      })
  }

}
