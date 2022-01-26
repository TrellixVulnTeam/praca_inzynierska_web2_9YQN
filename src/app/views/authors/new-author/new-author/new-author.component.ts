import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { AuthorService } from 'src/app/services/author/author.service';
import { UserService } from 'src/app/services/user/user.service';

const AUTHOR_ADDED = 'autor został dodany poprawnie';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent{

  newAuthor = new AuthorModel;
  form: FormGroup;
  surname: FormControl;
  name: FormControl;
  secondName: FormControl;
  biography: FormControl;
  birthDate: FormControl;
  deathDate: FormControl;
  userId: string | any = '';

  constructor(
    private authorService: AuthorService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.surname = new FormControl(''), [Validators.required];
      this.name = new FormControl('');
      this.secondName = new FormControl('');
      this.biography = new FormControl(''), [Validators.required];
      this.birthDate = new FormControl(''), [Validators.required];
      this.deathDate = new FormControl(''); 

      this.form = this.formBuilder.group({
        surname: this.surname,
        name: this.name,
        secondName: this.secondName,
        biography: this.biography,
        birthDate: this.birthDate,
        deathDate: this.deathDate
      });
    }

  onSubmit(){
    this.userId = this.userService.getUserId();

    this.newAuthor.isBuildIn = true;
    this.newAuthor.surname = this.surname.value;
    if(this.name.value != ''){
      this.newAuthor.name = this.name.value;
    }
    if(this.secondName.value != ''){
      this.newAuthor.secondName = this.secondName.value;
    }
    this.newAuthor.biography = this.biography.value;
    this.newAuthor.birthDate = this.birthDate.value;
    if(this.deathDate.value != ''){
      this.newAuthor.deathDate = this.deathDate.value;
    }
    this.newAuthor.addedBy = this.userId;

    this.authorService
      .createAuthor(this.newAuthor)
      .pipe(first())
      .subscribe(res =>{
        console.log(res);
        this.toastr.success("Dodano autora! Obecnie czeka na akceptacje.");
        this.router.navigate(['/authors']);
      }, error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      })
  }

}
