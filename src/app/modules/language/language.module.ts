import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageRoutingModule } from './language-routing.module';
import { DeleteLanguageComponent } from 'src/app/views/languages/delete-language/delete-language.component';
import { EditLanguageComponent } from 'src/app/views/languages/edit-language/edit-language.component';
import { LanguageComponent } from 'src/app/views/languages/language/language.component';
import { LanguagesComponent } from 'src/app/views/languages/languages/languages.component';
import { NewLanguageComponent } from 'src/app/views/languages/new-language/new-language.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material/material.module';
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { LanguageWriteGuard } from 'src/app/guard/languages/language-write.guard';
import { LanguageUpdateGuard } from 'src/app/guard/languages/language-update.guard';
import { LanguageSoftDeleteGuard } from 'src/app/guard/languages/language-soft-delete.guard';


@NgModule({
  imports: [
    CommonModule,
    LanguageRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    LanguagesComponent,
    LanguageComponent,
    DeleteLanguageComponent,
    EditLanguageComponent,
    NewLanguageComponent,
  ],
  providers: [
    authInterceptorProviders,
    LanguageService,

    LoginGuard,
    LanguageWriteGuard,
    LanguageUpdateGuard,
    LanguageSoftDeleteGuard
  ]
  
})
export class LanguageModule { }
