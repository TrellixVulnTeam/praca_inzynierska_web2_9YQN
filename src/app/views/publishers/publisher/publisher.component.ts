import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { PublisherModel } from 'src/app/models/publishers/punblisher.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { PublisherService } from 'src/app/services/publisher/publisher.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  publisher: PublisherModel | any = new PublisherModel;
  responder: ResponderModel | any = new ResponderModel;
  username: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private publisherService: PublisherService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data =>{
        this.getPublisherById(data.id);
      });
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

}
