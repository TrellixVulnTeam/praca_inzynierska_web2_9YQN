import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { AuthorService } from 'src/app/services/author/author.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authorId: string | any = '';
  userId: string = ''
  userName: string = ''
  respond = new ResponderModel();
  author: AuthorModel | any = new AuthorModel();

  constructor(
    private authorService: AuthorService,
    private activetedRoute: ActivatedRoute,
    private userService: UserService) { }

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
        this.getUserNameById(this.author.addedBy);
      },
      error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      });
  }

  getUserNameById(id: string){
    return this.userService
      .getUserNameById(id)
      .pipe(first())
      .subscribe(responder =>{
        this.respond = responder;
        this.userName = responder.object;
      },
      error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      });
  }

}
