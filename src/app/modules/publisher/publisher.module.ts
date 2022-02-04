import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublisherRoutingModule } from './publisher-routing.module';
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { PublisherSoftDeleteGuard } from 'src/app/guard/publishers/publisher-soft-delete.guard';
import { PublisherUpdateGuard } from 'src/app/guard/publishers/publisher-update.guard';
import { PublisherWriteGuard } from 'src/app/guard/publishers/publisher-write.guard';
import { DeletePublisherComponent } from 'src/app/views/publishers/delete-publisher/delete-publisher.component';
import { EditPublisherComponent } from 'src/app/views/publishers/edit-publisher/edit-publisher.component';
import { NewPublisherComponent } from 'src/app/views/publishers/new-publisher/new-publisher.component';
import { PublisherComponent } from 'src/app/views/publishers/publisher/publisher.component';
import { PublishersComponent } from 'src/app/views/publishers/publishers/publishers.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material/material.module';
import { PublisherService } from 'src/app/services/publisher/publisher.service';


@NgModule({
  imports: [
    CommonModule,
    PublisherRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    PublishersComponent,
    PublisherComponent,
    NewPublisherComponent,
    EditPublisherComponent,
    DeletePublisherComponent,
  ],
  providers: [
    authInterceptorProviders,
    PublisherService,

    LoginGuard,
    PublisherSoftDeleteGuard,
    PublisherUpdateGuard,
    PublisherWriteGuard,

  ]
})
export class PublisherModule { }
