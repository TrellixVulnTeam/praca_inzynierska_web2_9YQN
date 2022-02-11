import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { UserModel } from 'src/app/models/users/user-model';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  ok: string = 'OK';
  changePasswordMessage: string = '';
  responder: ResponderModel = new ResponderModel;
  userMe: UserModel = new UserModel;
  formPassword: FormGroup;
  formUpdate: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;
  email: FormControl;
  firstName: FormControl;
  lastName: FormControl;

  constructor(
    private user: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { 
      this.oldPassword = new FormControl('');
      this.newPassword = new FormControl('');

      this.email = new FormControl('');
      this.firstName = new FormControl('');
      this.lastName = new FormControl('');
    
      this.formPassword = this.formBuilder.group({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      });

      this.formUpdate = this.formBuilder.group({
         email: this.email,
         firstName: this.firstName,
         lastName: this.lastName
      });
    }

  ngOnInit(): void {
    this.getMe();
  }

  getFormPasswordControls(){
    return this.formPassword.controls;
  }

  getMe(){
    this.user
      .getMe()
      .pipe(first())
      .subscribe(response => {
        this.userMe = response;
        this.userMe.userName = response.userName;
      },
      error => {
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      }
      );
  }

  getListOfBooks(){}

  changePassword(){
    if(this.userMe.password != this.oldPassword.value){
        this.changePasswordMessage = "Poprzednie hasło jest nieprawidłowe";
        return;
    }

    this.userMe.password = this.newPassword.value;

    this.user
      .updateUser(this.userMe)
      .pipe(first())
      .subscribe(response =>{
        this.changePasswordMessage = "Hasło zostało zmienione";
      },
      error => {
        this.changePasswordMessage = error;
      });
      this.openSnackBar(this.changePasswordMessage, this.ok);
  }

  updateUser(){
    this.userMe.email = this.email.value;
    this.userMe.name = this.firstName.value;
    this.userMe.surname = this.lastName.value;

    this.user
      .updateUser(this.userMe)
      .pipe(first())
      .subscribe(response =>{
        this.changePasswordMessage = "Dane zostały zaktualizowane";
      },
      error => {
        this.changePasswordMessage = error;
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
