import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LanguageModel } from 'src/app/models/languages/language.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { LanguageService } from 'src/app/services/language/language.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-language',
  templateUrl: './new-language.component.html',
  styleUrls: ['./new-language.component.css']
})
export class NewLanguageComponent {

  reponder = new ResponderModel;
  languageModel = new LanguageModel;
  languageName: FormControl;
  form: FormGroup;
  userId: string = '';

  constructor(
    private languageService: LanguageService,
    private user: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
      this.languageName = new FormControl('');
      this.form = this.formBuilder.group({
        languageName: this.languageName
      });
  }


  onSubmit(){
    this.userId = this.user.getUserId();
    this.languageModel.isBuildIn = true;
    this.languageModel.language = this.languageName.value;
    this.languageModel.addedBy = this.userId;

    this.newLanguage(this.languageModel)
  }

  newLanguage(newLanguage: LanguageModel){
    this.languageService
      .newLanguage(newLanguage)
      .pipe(first())
      .subscribe(respond =>{
        this.router.navigate(['/languages']);
      }, error =>{
        console.log(error.error);
      });
  }

}


