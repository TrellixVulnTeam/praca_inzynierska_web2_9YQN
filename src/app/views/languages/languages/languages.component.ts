import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { LanguageModel } from 'src/app/models/languages/language.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { LanguageService } from 'src/app/services/language/language.service';
import { PermissionService } from 'src/app/services/permissions/permission.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  languages: LanguageModel | any = null;
  responder: ResponderModel = new ResponderModel;

  canAdd: boolean = this.userCanAdd();
  canEdit: boolean = this.userCanEdit();
  canDelete: boolean = this.userCanDelete();

  constructor(
    private languageService: LanguageService,
    private permissionService: PermissionService) { }

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

  userCanAdd(): boolean{
    return this.canAdd = this.permissionService.isPermited('Language.Write');
  }

  userCanEdit(): boolean{
    return this.canEdit = this.permissionService.isPermited('Language.Edit');
  }

  userCanDelete(): boolean{
    return this.canEdit = this.permissionService.isPermited('Language.SoftDelete');
  }

}
