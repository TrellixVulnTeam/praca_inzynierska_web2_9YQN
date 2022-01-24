import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material/material.module';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './views/main/main/main/main.component';
import { NavbarComponent } from './views/main/navbar/navbar/navbar.component';
import { LoginComponent } from './views/user/login/login/login.component';
import { RegisterComponent } from './views/user/register/register/register.component';
import { LoginGuard } from './guard/login/login.guard';
import { ToastrModule } from 'ngx-toastr';
import { BookAuthorDeleteGuard } from './guard/book-authors/book-author-delete.guard';
import { BookAproveGuard } from './guard/books/book-aprove.guard';
import { BookSoftDeleteGuard } from './guard/books/book-soft-delete.guard';
import { BookUpdateGuard } from './guard/books/book-update.guard';
import { CommentDeleteGuard } from './guard/comments/comment-delete.guard';
import { LanguageSoftDeleteGuard } from './guard/languages/language-soft-delete.guard';
import { LanguageUpdateGuard } from './guard/languages/language-update.guard';
import { LanguageWriteGuard } from './guard/languages/language-write.guard';
import { PublisherSoftDeleteGuard } from './guard/publishers/publisher-soft-delete.guard';
import { PublisherUpdateGuard } from './guard/publishers/publisher-update.guard';
import { PublisherWriteGuard } from './guard/publishers/publisher-write.guard';
import { UserPermissionDeleteGuard } from './guard/user-permissions/user-permission-delete.guard';
import { UserPermissionUpdateGuard } from './guard/user-permissions/user-permission-update.guard';
import { UserPermissionWriteGuard } from './guard/user-permissions/user-permission-write.guard';
import { UserDeleteGuard } from './guard/users/user-delete.guard';
import { AuthService } from './services/auth/auth.service';
import { PermissionService } from './services/permissions/permission.service';
import { SettingsService } from './services/settings/settings.service';
import { UserService } from './services/user/user.service';
import { CanDeactivateGuard } from './guard/can-deactivate/can-deactivate-guard';
import { ConfirmYesNoDialogComponent } from './views/confirm-yes-no-dialog/confirm-yes-no-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmYesNoDialogComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 2000, // 2 seconds
      progressBar: false,
      positionClass: 'toast-center-center'
    }),
  ],
  providers: [
    authInterceptorProviders,
    CanDeactivateGuard,
    
    AuthService,
    UserService,
    PermissionService,
    SettingsService,


    LoginGuard,

    BookAuthorDeleteGuard,

    BookAproveGuard,
    BookSoftDeleteGuard,
    BookUpdateGuard,

    CommentDeleteGuard,

    LanguageSoftDeleteGuard,
    LanguageUpdateGuard,
    LanguageWriteGuard,

    PublisherSoftDeleteGuard,
    PublisherUpdateGuard,
    PublisherWriteGuard,

    UserPermissionDeleteGuard,
    UserPermissionUpdateGuard,
    UserPermissionWriteGuard,

    UserDeleteGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
