import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { BookModel } from 'src/app/models/books/book.model';
import { ResponderModel } from 'src/app/models/responders/responder-model';
import { BookService } from 'src/app/services/book/book.service';
import { ImageCoverService } from 'src/app/services/image-cover/image-cover.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  responder: ResponderModel | any;
  highlightedBooks: BookModel[] = [];
  image: any;
  imageCover: any;
  imageCovers: any[] = [];

  constructor(private bookService: BookService,
    private imageCoverService: ImageCoverService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getHighlightedBooks();
    
  }

  getHighlightedBooks(){
    return this.bookService
      .getHighlightedBooks()
      .pipe(first())
      .subscribe(respond =>{
        this.responder = respond;
        if(this.responder.object != null){
          this.highlightedBooks = this.responder.object;
          this.getImageCoverById();
        }
      });
  }


  getImageCoverById(){
    for(let i = 0; i < this.highlightedBooks.length; i++){
    this.imageCoverService
      .getImages(this.highlightedBooks[i].imageCoverId)
      .pipe(first())
      .subscribe(respond => {
        let blob = new Blob([respond], {type: 'image/jpg'});
        var image = URL.createObjectURL(blob);
        this.imageCover = this.sanitizer.bypassSecurityTrustResourceUrl(`${image}`)
        this.imageCovers.push(this.imageCover);
      }, error =>{
        console.log(`HttpError: ${JSON.stringify(error)}`);
      });
    }
  }

}
