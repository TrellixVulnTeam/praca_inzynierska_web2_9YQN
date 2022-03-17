import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { BookModel } from 'src/app/models/books/book.model';
import { CategoryModel } from 'src/app/models/categories/category-models';
import { LanguageModel } from 'src/app/models/languages/language.model';
import { PublisherModel } from 'src/app/models/publishers/punblisher.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { AuthorService } from 'src/app/services/author/author.service';
import { BookService } from 'src/app/services/book/book.service';
import { BookAuthorService } from 'src/app/services/book_author/book-author.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageCoverService } from 'src/app/services/image-cover/image-cover.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { PublisherService } from 'src/app/services/publisher/publisher.service';
import { ConfirmYesNoDialogComponent } from '../../confirm-yes-no-dialog/confirm-yes-no-dialog.component';
import { ConfirmYesNoDialogModel } from '../../confirm-yes-no-dialog/models/confirm-yes-no-dialog-model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book: BookModel = new BookModel;
  responder: ResponderModel | any;
  author: AuthorModel = new AuthorModel;
  authors: AuthorModel[] = [];
  categories: CategoryModel[] = [];
  languages: LanguageModel[] = [];
  publishers: PublisherModel[] = [];
  imageFile: any;
  addedAuthors: AuthorModel[] = [];

  form: FormGroup;
  title: FormControl;
  subtitle: FormControl;
  series: FormControl;
  description: FormControl;
  publishedYear: FormControl;
  pages: FormControl;
  isbn: FormControl;

  authorId: string = ''
  authorsIds: string[] = [];
  categoryId: string = '';
  languageId: string = '';
  publisherId: string = '';
  imageCoverId: string = '';
  bookId: string = '';

  languageName: string = '';
  categoryName: string = '';
  publisherName: string = '';
  imageCover: any;


  constructor(
    private acticatedRoute: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private book_authorService: BookAuthorService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private publisherService: PublisherService,
    private imageService: ImageCoverService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) {
      this.title = new FormControl(this.book.title), [Validators.required];
      this.subtitle = new FormControl(this.book.subtitle),
      this.series = new FormControl(this.book.series),
      this.description = new FormControl(this.book.description), [Validators.required];
      this.publishedYear = new FormControl(this.book.publishedYear), [Validators.required];
      this.pages = new FormControl(this.book.pages),
      this.isbn = new FormControl(this.book.isbn), [Validators.required];

      this.form = this.formBuilder.group({
        title: this.title,
        subtitle: this.subtitle,
        series: this.series,
        description: this.description,
        publishedYear: this.publishedYear,
        pages: this.pages,
        isbn: this.isbn,
      });
     }

  ngOnInit(): void {
    this.acticatedRoute.params 
      .subscribe(data => this.getBookById(data.id))
    this.getAllAuthors();
    this.getAllCategories();
    this.getAllLanguages();
    this.getAllPublishers();
  }

  getBookById(id: string){
    return this.bookService
      .getBookById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.book = this.responder.object;
          this.getCategoryById(this.book.categoryId);
          this.getLanguageById(this.book.languageId);
          this.getPublisherById(this.book.publisherId);
          this.getImageCoverById(this.book.imageCoverId);
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  getCategoryById(id: string){
    this.categoryService
      .getCategoryById(id)
      .pipe(first())
      .subscribe(respond => {
        this.responder = respond;
        if(this.responder.object){
          this.categoryName = this.responder.object.category;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  getLanguageById(id: string){
    this.languageService
      .getLanguageById(id)
      .pipe(first())
      .subscribe(respond => {
        this.responder = respond;
        if(this.responder.object){
          this.languageName = this.responder.object.language;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  getPublisherById(id: string){
    this.publisherService
      .getPublisherById(id)
      .pipe(first())
      .subscribe(respond => {
        this.responder = respond;
        if(this.responder.object){
          this.publisherName = this.responder.object.publisherName;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  public async getImageCoverById(id: string){
    return this.imageService
      .getImages(id)
      .pipe(first())
      .subscribe(respond => {
        let blob = new Blob([respond], {type: 'image/jpg'});
        var image = URL.createObjectURL(blob);
        this.imageCover = this.sanitizer.bypassSecurityTrustResourceUrl(`${image}`)
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

  onSubmit(){
    this.book.imageCoverId = this.imageCoverId;
    this.book.isBuildIn = true;
    this.book.title = this.title.value;
    this.book.subtitle = this.subtitle.value;
    this.book.series = this.series.value;
    this.book.description = this.description.value;
    this.book.isbn = this.isbn.value;
    this.book.publishedYear = this.publishedYear.value;
    this.book.pages = this.pages.value;
    this.book.categoryId = this.categoryId;
    this.book.languageId = this.languageId;
    this.book.publisherId = this.publisherId;
    this.updateBook()
  }

  updateBook(){
    this.bookService
      .createBook(this.book)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.success){
          this.toastr.show('Książka została dodana');
          this.bookId = this.responder.object
        }
      })

    this.addedAuthorsOfBook();
  }

  addedAuthorsOfBook(){
    for(let i=0; i < this.authorsIds.length; i++){
      this.book_authorService
        .createBook_Author(this.authorsIds[i], this.bookId)
        .pipe(first())
        .subscribe()
    }

    this.router.navigate(['/books']);
  }

  addAuthor(authorId: string){
    this.authorsIds.push(authorId);
    this.getAuthorsByIds();
  }

  getAuthorsByIds(): void{
    this.addedAuthors = [];
    for(let i = 0; i < this.authorsIds.length; i++){
      this.authorService
        .getAuthorById(this.authorsIds[i])
        .pipe(first())
        .subscribe(respond => {
          this.responder = respond;
          if(this.responder.object != null){
            this.addedAuthors.push(this.responder.object);
          }
        }, error =>{
          console.log(`HttpError: ${error}`);
        })
    }
  }

  getAuthor(id: string){
    this.authorService
      .getAuthorById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.author = this.responder.object;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

  removeAuthor(i: number){
    this.authorsIds.splice(i, 1);
    this.addedAuthors.splice(i, 1);
  }

  uploadImage(event: any){
    this.imageFile = <File>event.target.files[0];   
  }  

  getAllAuthors(){
    this.authorService
      .getAllAuthors()
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.authors = this.responder.object;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

  getAllCategories(){
    this.categoryService
      .getAllCategories()
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.categories = this.responder.object;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

  getAllLanguages(){
    this.languageService
      .getAllLanguages()
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.languages = this.responder.object;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

  getAllPublishers(){
    this.publisherService
      .getPublishers()
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.publishers = this.responder.object;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });  
  }

  get formControls() {
    return this.form.controls;
}

  get unSavedX(): boolean {
    var title = this.formControls.title.value;
    var description = this.formControls.description.value;
    var isbn = this.formControls.isbn.value;
    var pages = this.formControls.pages.value;
    var publishedYear = this.formControls.publishedYear.value;

    var result = ((title && title.trim) 
    || (description && description.trim)
    || (isbn && isbn.trim)
    || (pages && pages.trim)
    || (publishedYear && publishedYear.trim)) 
    || this.form.touched ? true : false;
    return result;
  }
  
canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

  if (this.unSavedX) {
    var dialogResult = this.confirmDialog();
    dialogResult
      .subscribe({
        next: (result) => {
          if (result)
            this.form.reset();
        }
      });

    return dialogResult;
  }
  return of(true);
}


confirmDialog(): Observable<boolean> {
  var message = "Utracisz dane";
  var title = "Uwaga";

  const dialogData = new ConfirmYesNoDialogModel(title, message);

  const dialogRef = this.dialog.open(ConfirmYesNoDialogComponent, {
    maxWidth: "70%",
    data: dialogData
  });

  return dialogRef.afterClosed();
}

  

}
