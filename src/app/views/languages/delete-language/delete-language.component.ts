import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { LanguageService } from 'src/app/services/language/language.service';


@Component({
  selector: 'app-delete-language',
  templateUrl: './delete-language.component.html',
  styleUrls: ['./delete-language.component.css']
})
export class DeleteLanguageComponent implements OnInit {

  languageId: string = '';
  responder: ResponderModel | any = new ResponderModel;

  constructor(
    private languageService: LanguageService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data =>{
      this.languageId = data.id;
    });

    this.deleteLanguage(this.languageId);
  }

  deleteLanguage(id: string){
    return this.languageService
      .deleteLanguage(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.toastr.show(`język o identyfikatorze ${this.responder.object} został usunięty`);
          this.router.navigate(['/languages']);
        } else {
          this.toastr.error(this.responder.message);
          this.router.navigate(['/languages']);
        }
      }, error =>{
        console.log(`ErrorHttp: ${{error}}`);
      })
  }
}
