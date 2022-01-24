import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/categories/category-models';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { CategoryService } from 'src/app/services/category/category.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  respond: ResponderModel | any  = new ResponderModel();
  categories: CategoryModel[] = [new CategoryModel()];

  constructor(private settings: SettingsService,
    private categoryService: CategoryService) { }

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

}
