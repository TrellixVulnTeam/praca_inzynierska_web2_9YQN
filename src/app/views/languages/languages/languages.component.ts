import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { LanguageModel } from 'src/app/models/languages/language.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  languages: LanguageModel | any = null;
  responder: ResponderModel = new ResponderModel;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.getAllLanguages();
  }

  getAllLanguages(){
    this.languageService
      .getAllLanguages()
      .pipe(first())
      .subscribe(response =>{
        this.responder = response;
        this.languages = this.responder.object;
      }, error =>{
        console.log(`ErrorHttp ${JSON.stringify(error)}`)
      })
  }

}
