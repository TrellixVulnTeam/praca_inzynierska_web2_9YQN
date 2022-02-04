import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { PublisherModel } from 'src/app/models/publishers/punblisher.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { PublisherService } from 'src/app/services/publisher/publisher.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styleUrls: ['./edit-publisher.component.css']
})
export class EditPublisherComponent implements OnInit {

  responder: ResponderModel | any = new ResponderModel;
  publisher: PublisherModel = new PublisherModel;
  username: string = '';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
      this.publisherName = new FormControl('');
      this.postCode = new FormControl('');
      this.city = new FormControl(this.publisher.city);
      this.street = new FormControl(this.publisher.street);
      this.building = new FormControl(this.publisher.building);
      this.premises = new FormControl(this.publisher.premises);
      this.form = this.formBuilder.group({
        publisherName: this.publisherName.value,
        postCode: this.postCode.value,
        city: this.city.value,
        street: this.street.value,
        building: this.building.value,
        premises: this.premises.value
      })
   }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data =>{
        this.getPublisherById(data.id);
      });
  }

  onSubmit(){
    this.updatePublisher();
  }

  getPublisherById(id: string){
    return this.publisherService
      .getPublisherById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.publisher = this.responder.object;
          this.getUserName(this.publisher.addedBy);
        } else {
          this.toastr.show(this.responder.message);
          this.router.navigate(['/publishers']);
        }        
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  getUserName(id: string){
    return this.userService
      .getUserNameById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        this.username = this.responder.object;
      }, error =>{
          console.log(`HttpError ${JSON.stringify(error)}`);
      })
  }

  updatePublisher(){
    this.publisher.publisherName = this.publisherName.value;
    this.publisher.postCode = this.postCode.value;
    this.publisher.city = this.city.value;
    this.publisher.street = this.street.value;
    this.publisher.building = this.building.value;
    this.publisher.premises = this.premises.value;

    return this.publisherService
      .editPublisher(this.publisher)
      .pipe(first())
      .subscribe(response =>{
        let name = this.publisher.publisherName;
        this.toastr.show(`${{name}} został zaktualizowany`);
        this.router.navigate(['/publishers']);
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

}
