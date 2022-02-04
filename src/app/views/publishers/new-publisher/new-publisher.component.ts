import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { PublisherModel } from 'src/app/models/publishers/punblisher.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { PublisherService } from 'src/app/services/publisher/publisher.service';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmYesNoDialogComponent } from '../../confirm-yes-no-dialog/confirm-yes-no-dialog.component';
import { ConfirmYesNoDialogModel } from '../../confirm-yes-no-dialog/models/confirm-yes-no-dialog-model';

@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.css']
})
export class NewPublisherComponent {

  publisher = new PublisherModel;
  responder: ResponderModel | any = new ResponderModel;

  form: FormGroup;
  publisherName: FormControl;
  postCode: FormControl;
  city: FormControl;
  street: FormControl;
  building: FormControl;
  premises: FormControl;

  constructor(
    private publisherService: PublisherService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.publisherName = new FormControl('');
      this.postCode = new FormControl();
      this.city = new FormControl();
      this.street = new FormControl();
      this.building = new FormControl();
      this.premises = new FormControl();

      this.form = this.formBuilder.group({
        publisherName: this.publisherName,
        postCode: this.postCode,
        city: this.city,
        street: this.street,
        building: this.building,
        premises: this.premises
      })
     }

  onSubmit(){
    this.createPublisher();
  }

  get formControls() {
      return this.form.controls;
  }

  createPublisher(){
    this.publisher.publisherName = this.publisherName.value;
    this.publisher.isBuildIn = true;
    this.publisher.postCode = this.postCode.value;
    this.publisher.city = this.city.value;
    this.publisher.street = this.street.value;
    this.publisher.building = this.building.value;
    this.publisher.premises = this.premises.value;
    this.publisher.addedBy = this.getUserId();

    return this.publisherService
      .newPublisher(this.publisher)
      .pipe(first())
      .subscribe(respond => {
        this.toastr.show('Wydawca został dodany');
        this.router.navigate(['/publishers']);
      }, error => {
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

  getUserId(): string{
    return this.userService.getUserId();
  }

}
