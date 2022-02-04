import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-approve-book',
  templateUrl: './approve-book.component.html',
  styleUrls: ['./approve-book.component.css']
})
export class ApproveBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
