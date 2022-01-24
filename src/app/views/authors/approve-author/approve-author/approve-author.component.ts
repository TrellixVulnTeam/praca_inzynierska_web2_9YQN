import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { AuthorService } from 'src/app/services/author/author.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-approve-author',
  templateUrl: './approve-author.component.html',
  styleUrls: ['./approve-author.component.css']
})
export class ApproveAuthorComponent implements OnInit {

  authorId: string | any = '';
  userId: string = ''
  respond = new ResponderModel();
  author: AuthorModel | any = new AuthorModel();

  constructor(
    private authorService: AuthorService,
    private activetedRoute: ActivatedRoute,
    private toastr: ToastrService
      ) { }

  ngOnInit(): void {

    this.activetedRoute.params
    .subscribe(data => {
      this.authorId = data.id;
    });

    this.getAuthor(this.authorId);
  }

  getAuthor(authorId: string){
    return this.authorService
      .getAuthorById(authorId)
      .pipe(first())
      .subscribe(responder =>{
        this.respond = responder;
        this.author = this.respond.object;
        this.approveAuthor();
      },
      error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      });
  }

  approveAuthor(){
    return this.authorService
      .approveAuthor(this.author)
      .subscribe(respoder => {
        this.respond = respoder;
        if(this.respond.success == true){
          this.toastr.show('Autor został zaakceptowany');
        }
      },
        error => {
          console.error(`ErrotHttp: ${JSON.stringify(error)}`);
        });
  }



}
