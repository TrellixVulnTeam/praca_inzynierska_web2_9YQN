import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CommentModel } from 'src/app/models/comments/comment.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PermissionService } from 'src/app/services/permissions/permission.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: CommentModel[] = [];
  responder: ResponderModel | any;
  userName: string = 'Admin';
  canDelete: boolean = this.userCanDelete();

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private permissionsService: PermissionService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data =>{
        this.getCommentsForBook(data.id);
      });
  }

  getCommentsForBook(id: string){
    return this.commentService
      .getCommentByBook(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.comments = this.responder.object;
          this.comments.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        } else {
          this.comments = [new CommentModel];
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

  public getUserName(id: string): string{
    this.userService
      .getUserNameById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.userName = this.responder.object
        } else {
          this.userName = '';
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
   
    return this.userName;
  }


  userCanDelete(): boolean{
    return this.permissionsService
      .isPermited('Comment.SoftDelete');
  }

  deleteComment(id: string, bookId: string){
    return this.commentService
      .deleteComment(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.success){
          this.toastr.show('Komentarz został usunięty');
          this.router.navigate(['/books/book/'+ bookId]);   
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
        this.router.navigate(['/books/book/'+ bookId]);
      });
      
  }
}
