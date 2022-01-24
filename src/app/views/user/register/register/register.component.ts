import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from 'src/app/models/users/user-model';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmYesNoDialogComponent } from 'src/app/views/confirm-yes-no-dialog/confirm-yes-no-dialog.component';
import { ConfirmYesNoDialogModel } from 'src/app/views/confirm-yes-no-dialog/models/confirm-yes-no-dialog-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  form: FormGroup;
  userName: FormControl;
  password: FormControl;
  repassword: FormControl;
  email: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  sex: FormControl;
  registred = false;

  user: UserModel = new UserModel;

  constructor(private userService: UserService,
      private route: Router,
      private formBuilder: FormBuilder,
      private dialog: MatDialog) 
      {
          this.userName = new FormControl(''), Validators.required;
          this.password = new FormControl(''), Validators.required;
          this.repassword = new FormControl(''), Validators.required;
          this.email = new FormControl(''), Validators.required;
          this.firstName = new FormControl('');
          this.lastName = new FormControl('');
          this.sex = new FormControl(''), Validators.required;
          
          this.form = this.formBuilder.group({
            username: this.userName,
            password: this.password,
            repassword: this.repassword,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            sex: this.sex,
          });
      }

  get formControls() {
    return this.form.controls;
  }    

  onSubmit(){
    if(this.password.value !== this.repassword.value){
      window.alert("hasło niepoprawne");
    }
    else{
      this.user.id = '00000000-0000-0000-0000-000000000000';
      this.user.isBuildIn = true;
      this.user.createdAt = new Date();
      this.user.userName = this.userName.value;
      this.user.password = this.password.value;     
      this.user.email = this.email.value;
      this.user.likes = 0;
      this.user.numberOfBooks = 0;
      this.user.name = this.firstName.value;
      this.user.surname = this.lastName.value;
      this.user.sex = this.sex.value;
      this.user.level = 'czytelnik';

      this.userService
          .postRegister(this.user)
          .pipe(first())
          .subscribe(response => {
            console.log(response);
            this.registred = true;
          },
          error => {
            console.log(`ErrorHttp: ${JSON.stringify(error)}`);
            this.registred = false;
          });

      if(this.registred){
        this.route.navigate(['/login']);
      }
      
    }
  }

  get unSavedX(): boolean {
    var username = this.formControls.username.value;
    var password = this.formControls.password.value;
    var repassword = this.formControls.repassword.value;
    var email = this.formControls.email.value;
    var firstname = this.formControls.firstName.value;
    var lastname = this.formControls.lastName.value

    var result = ((username && username.trim) || (password && password.trim)) 
    || (repassword && repassword.trim) || (email && email.trim) 
    || (firstname && firstname.trim) || (lastname && lastname.trim) 
    || this.form.touched ? true : false;
    return result;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.unSavedX) {
      var dialogResult = this.confirmDialog();
      dialogResult
        .subscribe({
          next: (result) => {
            if (result)
              this.form.reset();
          }
        });

      return dialogResult;
    }
    return of(true);
  }


  confirmDialog(): Observable<boolean> {
    var message = "Utracisz dane";
    var title = "Uwaga";

    const dialogData = new ConfirmYesNoDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmYesNoDialogComponent, {
      maxWidth: "70%",
      data: dialogData
    });

    return dialogRef.afterClosed();
  }

}
