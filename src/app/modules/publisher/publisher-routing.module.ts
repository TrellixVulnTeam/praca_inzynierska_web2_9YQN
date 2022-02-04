import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guard/login/login.guard';
import { PublisherSoftDeleteGuard } from 'src/app/guard/publishers/publisher-soft-delete.guard';
import { PublisherUpdateGuard } from 'src/app/guard/publishers/publisher-update.guard';
import { PublisherWriteGuard } from 'src/app/guard/publishers/publisher-write.guard';
import { DeletePublisherComponent } from 'src/app/views/publishers/delete-publisher/delete-publisher.component';
import { EditPublisherComponent } from 'src/app/views/publishers/edit-publisher/edit-publisher.component';
import { NewPublisherComponent } from 'src/app/views/publishers/new-publisher/new-publisher.component';
import { PublisherComponent } from 'src/app/views/publishers/publisher/publisher.component';
import { PublishersComponent } from 'src/app/views/publishers/publishers/publishers.component';

const routes: Routes = [
  {path: '', children:[
    {path: '', component: PublishersComponent},
    {path: 'publisher/:id', component: PublisherComponent},
    {path: 'new-publisher', component: NewPublisherComponent, canActivate: [LoginGuard, PublisherWriteGuard]},
    {path: 'edit-publisher/:id', component: EditPublisherComponent, canActivate: [LoginGuard, PublisherUpdateGuard]},
    {path: 'delete-publisher/:id', component: DeletePublisherComponent, canActivate: [LoginGuard, PublisherSoftDeleteGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublisherRoutingModule { }
