import { Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/categories/category-models';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent{
  

  newCategory: CategoryModel = new CategoryModel();
  form: FormGroup;
  categoryName: FormControl;
  userId: string | any = '';

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.categoryName = new FormControl('');

      this.form = this.formBuilder.group({
        categoryName: this.categoryName
      });
    }

    onSubmit(){
      this.userId = this.userService.getUserId();

      this.newCategory = {
        id: '00000000-0000-0000-0000-000000000000',
        category: this.categoryName.value,
        isBuildIn: true,
        createdAt: new Date(),
        userId: this.userId
      }

      this.categoryService
        .createCategory(this.newCategory)
        .pipe(first())
        .subscribe(res =>{
          console.log(res);
          this.toastr.success("Dodano kategorię");
          this.router.navigate(['/categories'])
        },
        error => {
          console.error(`ErrorHttp: ${JSON.stringify(error)}`);
        })
    }

}
