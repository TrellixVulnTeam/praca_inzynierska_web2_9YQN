import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/categories/category-models';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { CategoryService } from 'src/app/services/category/category.service';
import { PermissionService } from 'src/app/services/permissions/permission.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  respond: ResponderModel | any  = new ResponderModel();
  categories: CategoryModel[] = [new CategoryModel()];
  canEdit: boolean = this.userCanEdit();
  canDelete: boolean = this.userCanDelete();
  canAdd: boolean = this.userCanAdd();

  constructor(
        private categoryService: CategoryService,
        private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    return this.categoryService
      .getAllCategories()
      .pipe(first())
      .subscribe(responder => {
        this.respond = responder;
        this.categories = this.respond.object;
      },
      error => {
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      })
  }

  userCanDelete(): boolean{
    return this.canDelete = this.permissionService.isPermited('Category.Delete');
  }

  userCanEdit(): boolean{
    return this.canEdit = this.permissionService.isPermited('Category.Update');
  }

  userCanAdd(): boolean{
    return this.canAdd = this.permissionService.isPermited('Category.Write');
  }

}
