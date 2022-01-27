import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { AuthorService } from 'src/app/services/author/author.service';
import { PermissionService } from 'src/app/services/permissions/permission.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  responder = new ResponderModel;
  authors: AuthorModel | any = [];
  canApprove: boolean = this.userCanApprove();
  canEdit: boolean = this.userCanEdit();
  canDelete: boolean = this.userCanDelete();

  constructor(
    private authorService: AuthorService,
    private permissions: PermissionService) { }

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

  userCanEdit(): boolean{
    return this.canEdit = this.permissions.isPermited('Author.Update');
  }

  userCanDelete(): boolean{
    return this.canDelete = this.permissions.isPermited('Author.SoftDelete');
  }

  userCanApprove(): boolean{
    return this.canApprove = this.permissions.isPermited('Author.Approve');
  }

}
