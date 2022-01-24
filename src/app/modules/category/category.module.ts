import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from '../material/material/material.module';
import { CategoriesComponent } from 'src/app/views/categories/categories/categories/categories.component';
import { CategoryComponent } from 'src/app/views/categories/category/category/category.component';
import { EditCategoryComponent } from 'src/app/views/categories/edit-category/edit-category/edit-category.component';
import { DeleteAuthorComponent } from 'src/app/views/authors/delete-author/delete-author/delete-author.component';
import { DeleteCategoryComponent } from 'src/app/views/categories/delete-category/delete-category/delete-category.component';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { CategoryService } from 'src/app/services/category/category.service';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { CategoryWriteGuard } from 'src/app/guard/categories/category-write.guard';
import { CategorySoftDeleteGuard } from 'src/app/guard/categories/category-soft-delete.guard';
import { CategoryUpdateGuard } from 'src/app/guard/categories/category-update.guard';
import { NewCategoryComponent } from 'src/app/views/categories/new-category/new-category/new-category.component';


@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,

    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
  ],
  providers: [
    authInterceptorProviders,
    SettingsService,
    CategoryService,

    LoginGuard,

    CategoryWriteGuard,
    CategoryUpdateGuard,
    CategorySoftDeleteGuard
  ]
  
})
export class CategoryModule { }
