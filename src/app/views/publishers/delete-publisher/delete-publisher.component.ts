import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { PublisherService } from 'src/app/services/publisher/publisher.service';

@Component({
  selector: 'app-delete-publisher',
  templateUrl: './delete-publisher.component.html',
  styleUrls: ['./delete-publisher.component.css']
})
export class DeletePublisherComponent implements OnInit {
  
  responder: ResponderModel | any = new ResponderModel;

  constructor(
    private publisherService: PublisherService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data =>{
        this.deletePublisher(data.id);
      })
  }

  deletePublisher(id: string){
    return this.publisherService
      .deletePublisher(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.toastr.show("Wydawca został usunięty");
          this.router.navigate(['/publishers']);
        } else {
          this.toastr.show(this.responder.message);
          this.router.navigate(['/publishers']);
        }
      },
      error =>{
        this.toastr.show(error.error.message);
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

}
