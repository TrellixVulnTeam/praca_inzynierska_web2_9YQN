import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorySoftDeleteGuard } from 'src/app/guard/categories/category-soft-delete.guard';
import { CategoryUpdateGuard } from 'src/app/guard/categories/category-update.guard';
import { CategoryWriteGuard } from 'src/app/guard/categories/category-write.guard';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { CategoriesComponent } from 'src/app/views/categories/categories/categories/categories.component';
import { CategoryComponent } from 'src/app/views/categories/category/category/category.component';
import { DeleteCategoryComponent } from 'src/app/views/categories/delete-category/delete-category/delete-category.component';
import { EditCategoryComponent } from 'src/app/views/categories/edit-category/edit-category/edit-category.component';
import { NewCategoryComponent } from 'src/app/views/categories/new-category/new-category/new-category.component';

const routes: Routes = [
  {path: '', children:[
    {path: '', component: CategoriesComponent},
    {path: 'category/:id', component: CategoryComponent},
    {path: 'new-category', component: NewCategoryComponent, canActivate: [LoginGuard, CategoryWriteGuard]},
    {path: 'edit-category/:id', component: EditCategoryComponent, canActivate: [LoginGuard, CategoryUpdateGuard]},
    {path: 'delete-category/:id', component: DeleteCategoryComponent, canActivate: [LoginGuard, CategorySoftDeleteGuard]}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
