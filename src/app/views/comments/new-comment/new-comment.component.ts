import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CommentModel } from 'src/app/models/comments/comment.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PermissionService } from 'src/app/services/permissions/permission.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  responder: ResponderModel | any;
  userName: string = this.userService.getUserName();
  bookId: string = '';
  comment = new CommentModel;
  commentText: FormControl;
  loggedIn: boolean = this.isLoggedIn();
  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.commentText = new FormControl();
    this.form = this.formBuilder.group({
      commentText: this.commentText
    })
   }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data =>{
        this.bookId = data.id;
      })
  }

  onSubmit(){
    this.comment.bookId = this.bookId;
    this.comment.comment = this.commentText.value;
    this.comment.addedBy = this.userService.getUserId();
    this.comment.userName = this.userService.getUserName();
    this.createComment();
    this.router.navigate([`/books/book/${this.bookId}`]);
  }

  createComment(){
    this.commentService
    .createComment(this.comment)
    .pipe(first())
    .subscribe(respond =>{
      this.responder = respond;
      if(this.responder.success){
        this.toastr.show("komentarz został dodany");     
      } else {
        this.toastr.show('komentarz nie został dodany');
      }
    }, error =>{
      console.log(`HttpError: ${JSON.stringify(error)}`);
      this.router.navigate([`/books/book/${this.bookId}`]);
    })
    this.router.navigate([`/books/book/${this.bookId}`]);
  }

  isLoggedIn(): boolean{
    if(this.userService.getUserId().length > 8){
      return true;
    } else {
      return false;
    }
  }

}
