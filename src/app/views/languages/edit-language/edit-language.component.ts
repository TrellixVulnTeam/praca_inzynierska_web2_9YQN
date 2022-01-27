import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LanguageModel } from 'src/app/models/languages/language.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { LanguageService } from 'src/app/services/language/language.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.css']
})
export class EditLanguageComponent implements OnInit {
  
  languageId: string = '';
  language: LanguageModel | any = new LanguageModel;
  reponder = new ResponderModel;
  userName: string | any = '';
  form: FormGroup;
  languageName: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.languageName = new FormControl('');

      this.form = this.formBuilder.group({
        languageName: this.languageName
      })
     }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data => {
        this.languageId = data.id;
      })

      this.getLanguage(this.languageId);
  }

  getLanguage(languageId: string){
    return this.languageService
      .getLanguageById(languageId)
      .pipe(first())
      .subscribe(respond =>{
        this.reponder = respond;
        this.language = this.reponder.object;
        this.getUserName(this.language.addedBy);
      }, error =>{
        console.log(`HttpError ${JSON.stringify(error)}`);
      });
  }

  getUserName(userId: string){
    return this.userService
      .getUserNameById(userId)
      .pipe(first())
      .subscribe(respond =>{
        this.reponder = respond;
        this.userName = this.reponder.object;
      }, error =>{
        console.log(`HttpError ${JSON.stringify(error)}`)
      });
  }

  onSubmit(){
    this.updateLanguage();
  }

  updateLanguage(){
    this.language.language = this.languageName.value;
    
    return this.languageService
      .updateLanguage(this.language)
      .pipe(first())
      .subscribe(respond =>{
        this.toastr.show("wybrany język został zaktualizowany");
        this.router.navigate(['/']);
      },
      error => {
        console.log(JSON.stringify(error));
      })
  }

}
