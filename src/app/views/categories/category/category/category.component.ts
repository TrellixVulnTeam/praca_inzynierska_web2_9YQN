import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/categories/category-models';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryId: string | any = '';
  userId: string = ''
  userName: string = ''
  respond = new ResponderModel();
  category: CategoryModel | any = new CategoryModel();

  constructor(
    private categoryService: CategoryService,
    private activetedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {

    this.activetedRoute.params
    .subscribe(data => {
      this.categoryId = data.id;
    });

    this.getCategory(this.categoryId);
  }

  getCategory(categoryId: string){
    return this.categoryService
      .getCategoryById(categoryId)
      .pipe(first())
      .subscribe(responder =>{
        this.respond = responder;
        this.category = this.respond.object;
        this.getUserNameById(this.category.userId);
      },
      error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      });
  }

  getUserNameById(id: string){
    return this.userService
      .getUserNameById(id)
      .pipe(first())
      .subscribe(responder =>{
        this.respond = responder;
        this.userName = responder.object;
      },
      error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      });
  }
}
