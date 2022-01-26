import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageSoftDeleteGuard } from 'src/app/guard/languages/language-soft-delete.guard';
import { LanguageUpdateGuard } from 'src/app/guard/languages/language-update.guard';
import { LanguageWriteGuard } from 'src/app/guard/languages/language-write.guard';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { CategoriesComponent } from 'src/app/views/categories/categories/categories/categories.component';
import { DeleteLanguageComponent } from 'src/app/views/languages/delete-language/delete-language.component';
import { EditLanguageComponent } from 'src/app/views/languages/edit-language/edit-language.component';
import { LanguageComponent } from 'src/app/views/languages/language/language.component';
import { LanguagesComponent } from 'src/app/views/languages/languages/languages.component';
import { NewLanguageComponent } from 'src/app/views/languages/new-language/new-language.component';

const routes: Routes = [
  {path: '', children: [
    {path: '', component: LanguagesComponent, canActivate: [LoginGuard] },
    {path: 'language/:id', component: LanguageComponent, canActivate: [LoginGuard] },
    {path: 'new-language', component: NewLanguageComponent, canActivate: [LoginGuard, LanguageWriteGuard]},
    {path: 'edit-language/:id', component: EditLanguageComponent, canActivate: [LoginGuard, LanguageUpdateGuard]},
    {path: 'delete-language/:id', component: DeleteLanguageComponent, canActivate: [LoginGuard, LanguageSoftDeleteGuard]}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }
