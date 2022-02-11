import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { AuthorService } from 'src/app/services/author/author.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  responder: ResponderModel | any;
  author = new AuthorModel;
  form: FormGroup;
  surname: FormControl;
  name: FormControl;
  secondName: FormControl;
  biography: FormControl;
  birthDate: FormControl;
  deathDate: FormControl;
  userName: string = '';

  constructor(
    private authorService: AuthorService,
    private userService: UserService,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.surname = new FormControl(this.author.surname), [Validators.required];
      this.name = new FormControl(this.author.name);
      this.secondName = new FormControl();
      this.biography = new FormControl(this.author.biography), [Validators.required];
      this.birthDate = new FormControl(this.author.birthDate), [Validators.required];
      this.deathDate = new FormControl(this.author.deathDate); 

      this.form = this.formBuilder.group({
        surname: this.surname,
        name: this.name,
        secondName: this.secondName,
        biography: this.biography,
        birthDate: this.birthDate,
        deathDate: this.deathDate
      });
    }
  ngOnInit(): void {
    this.activatedRouter.params
      .subscribe(data =>{
        this.getAuthorById(data.id);
      })
  }

  onSubmit(){
    this.author.surname = this.surname.value;
    this.author.name = this.name.value;
    this.author.secondName = this.secondName.value;
    this.author.biography = this.biography.value;
    this.author.birthDate = this.birthDate.value;
    this. author.deathDate = this.deathDate.value;
    this.updateAuthor();
  }

  getAuthorById(id: string){
    return this.authorService
      .getAuthorById(id)
      .pipe(first())
      .subscribe(respond => {
        this.responder = respond;
        if(this.responder.object != null){
          this.author = this.responder.object;
          this.getUserNameById(this.author.addedBy);
        } else {
          this.toastr.show(this.responder.message);
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
        this.toastr.show('wystąpił błąd w trakcie pobierania autora');
      })
  }

  getUserNameById(id: string){
    return this.userService
      .getUserNameById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        this.userName = respond.object;
      },
      error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      });
  }

  updateAuthor(){
    return this.authorService
      .updateAuthor(this.author)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.toastr.show('Autor został zaktualizowany');
          this.router.navigate(['/authors']);
        } else {
          this.toastr.show('obiekt pusty?');
          this.responder.object;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
        this.toastr.show("Wystąpił błąd w trakcie aktualizacji autorów");
      });
  }

}
