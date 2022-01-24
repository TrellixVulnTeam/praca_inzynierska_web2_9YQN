import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { AuthorService } from 'src/app/services/author/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  responder = new ResponderModel;
  authors: AuthorModel | any = [];

  constructor(
    private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(){
    this.authorService
      .getAllAuthors()
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        this.authors = this.responder.object;
      },
      error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      });
  }

}
