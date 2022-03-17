import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, subscribeOn } from 'rxjs/operators';
import { AuthorModel } from 'src/app/models/authors/author-model';
import { BookModel } from 'src/app/models/books/book.model';
import { BookUserModel } from 'src/app/models/book_users/book_user.model';
import { CategoryModel } from 'src/app/models/categories/category-models';
import { LanguageModel } from 'src/app/models/languages/language.model';
import { PublisherModel } from 'src/app/models/publishers/punblisher.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { AuthorService } from 'src/app/services/author/author.service';
import { BookService } from 'src/app/services/book/book.service';
import { BookUserService } from 'src/app/services/book_user/book-user.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageCoverService } from 'src/app/services/image-cover/image-cover.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { PublisherService } from 'src/app/services/publisher/publisher.service';
import { UserService } from 'src/app/services/user/user.service';
import { BookAuthorService} from 'src/app/services/book_author/book-author.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId: string = '';
  book: BookModel = new BookModel;
  responder: ResponderModel | any = new ResponderModel;
  userName: string = '';
  category: CategoryModel = new CategoryModel;
  language: LanguageModel = new LanguageModel;
  publisher: PublisherModel = new PublisherModel;
  author: AuthorModel = new AuthorModel;
  image: SafeResourceUrl = '';
  imageCover: any;


  constructor(
    private activetedRoute: ActivatedRoute,
    private authorService: AuthorService,
    private bookService: BookService,
    private userService: UserService,
    private categoryService: CategoryService,
    private imageService: ImageCoverService,
    private languageService: LanguageService,
    private publisherService: PublisherService,
    private bookUserService: BookUserService,
    private bookAuthorService: BookAuthorService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activetedRoute.params
      .subscribe(data => this.bookId = data.id);
    
    this.getBookById(this.bookId);
  }

  getBookById(id: string){
    return this.bookService
      .getBookById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.book = this.responder.object;
          this.getUserName(this.book.createdBy);
          this.getCategory(this.book.categoryId);
          this.getPublisher(this.book.publisherId);
          this.getLanguage(this.book.languageId);
          this.getImageCover(this.book.imageCoverId);
          this.getAuthors(this.book.id);
        } else {
          this.toastr.show(this.responder.message);
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  getUserName(id: string){
    return this.userService
      .getUserNameById(id)
      .pipe(first())
      .subscribe(response =>{
        this.responder = response;
        if(this.responder.object != null){
          this.userName = this.responder.object;
        } else {
          this.userName = 'brak danych';
        }
      })
  }

  getAuthors(id: string){
    return this.bookAuthorService
      .getAuthorsIdsByBook(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
         this.getAuthorsData(this.responder.object);
        } 
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
  }

  getAuthorsData(id: string){
    return this.authorService.getAuthorById(id)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.author = this.responder.object;
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

  getCategory(id: string){
    return this.categoryService
      .getCategoryById(id)
      .pipe(first())
      .subscribe(response =>{
        this.responder = response;
        if(this.responder.object != null){
          this.category = this.responder.object;
        } else {
          this.category.category = 'brak danych';
        }
      }, error => console.log(`HttpError: ${JSON.stringify(error)}`));
  }

  getLanguage(id: string){
    return this.languageService
      .getLanguageById(id)
      .pipe(first())
      .subscribe(response =>{
        this.responder = response;
        if(this.responder.object != null){
          this.language = this.responder.object;
        } else {
          this.language.language = 'brak danych';
        }
      }, error => console.log(`HttpError: ${JSON.stringify(error)}`));
  }

  getPublisher(id: string){
    return this.publisherService
      .getPublisherById(id)
      .pipe(first())
      .subscribe(response =>{
        this.responder = response;
        if(this.responder.object != null){
          this.publisher = this.responder.object;
        } else {
          this.publisher.publisherName = 'brak danych';
        }
      }, error => console.log(`HttpError: ${JSON.stringify(error)}`));
  }

  public async getImageCover(id: string){
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

  addBookToUserList(){
    var bookUser = new BookUserModel;
    bookUser.bookId = this.bookId;
    bookUser.userId = this.userService.getUserId();
    bookUser.isBuildIn = true;

    this.bookUserService
      .AddBookToUserList(bookUser)
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.success){
          this.toastr.show('Książka została dodana do listy');
        }
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      })
  }

}
