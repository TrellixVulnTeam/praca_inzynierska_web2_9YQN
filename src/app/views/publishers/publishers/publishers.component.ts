import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { PublisherModel } from 'src/app/models/publishers/punblisher.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { PermissionService } from 'src/app/services/permissions/permission.service';
import { PublisherService } from 'src/app/services/publisher/publisher.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {

  publishers: PublisherModel[] = [new PublisherModel];
  responder: ResponderModel | any = new ResponderModel;
  canAdd: boolean = this.userCanAdd();
  canEdit: boolean = this.userCanEdit();
  canDelete: boolean = this.userCanDelete();

  constructor(
    private publisherService: PublisherService,
    private permissionService: PermissionService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllPublishers();
  }

  getAllPublishers(){
    return this.publisherService
      .getPublishers()
      .pipe(first())
      .subscribe(respond => {
        this.responder = respond;
        if(this.responder.object == null){
          this.toastr.show(this.responder.message);
        } else {
          this.publishers = this.responder.object
        }
      }, error => {
        console.log(`ErrorHttp: ${error}`);
      })
  }

  userCanAdd(): boolean{
    return this.permissionService.isPermited('Publisher.Write');
  }

  userCanEdit(): boolean{
    return this.permissionService.isPermited('Publisher.Update');
  }

  userCanDelete(): boolean{
    return this.permissionService.isPermited('Publisher.SoftDelete');
  }

}
