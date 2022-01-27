import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/categories/category-models';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit{

  categoryId: string | any = '';
  userId: string = ''
  userName: string = ''
  respond = new ResponderModel();
  category: CategoryModel | any = new CategoryModel();
  form: FormGroup;
  categoryName: FormControl;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder) {
      this.categoryName = new FormControl('');

      this.form = this.formBuilder.group({
        categoryName: this.categoryName
      });
     }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(data => {
      this.categoryId = data.id;    
    });

    this.getCategory(this.categoryId);
  }

  onSubmit(){
    this.updateCategory(this.category);
  }

  getCategory(userId: string){
    return this.categoryService
      .getCategoryById(userId)
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
  
  updateCategory(category: CategoryModel){
    this.category.category = this.categoryName.value;

    return this.categoryService
        .updateCategory(category)
        .pipe(first())
        .subscribe(responder =>{
          this.router.navigate(['/categories']);
        },
        error =>{
          console.error(`ErrorHttp: ${JSON.stringify(error)}`);
        });     
  }

  get formControls(){
    return this.form.controls;
  }

  
}
