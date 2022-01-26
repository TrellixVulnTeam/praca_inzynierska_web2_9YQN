import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LanguageModel } from 'src/app/models/languages/language.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { LanguageService } from 'src/app/services/language/language.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  languageId: string = '';
  userName: string | any = '';
  responder = new ResponderModel;
  language: LanguageModel | any = new LanguageModel;

  constructor(
    private languageService: LanguageService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(data =>{
        this.languageId = data.id;
      })

    this.getLanguageById(this.languageId)
  }

  getLanguageById(languageId: string){
    return this.languageService
      .getLanguageById(languageId)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object == null){
          this.toastr.show(this.responder.message);
        }
        if(this.responder.object != null){
          this.language = this.responder.object;
          this.getUserNameById(this.language.addedBy);
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
      
  }

  getUserNameById(id: string){
    return this.userService
      .getUserNameById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        this.userName = this.responder.object;
      },
      error =>{
        console.error(`ErrorHttp: ${JSON.stringify(error)}`);
      });
  }

}
