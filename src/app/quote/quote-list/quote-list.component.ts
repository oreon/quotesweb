import { Component, OnInit, Input } from '@angular/core';
import { Quote } from '../quote';
import { Router } from '@angular/router';
import { QuoteService } from '../quote.service';
import { BaseListComponent } from '../../base/base-list.component';
import { BaseEntity } from '../../base/base';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent extends BaseListComponent<Quote>
  implements OnInit {
  records: Quote[];
  startAt: any;
  endAt: any;
  lastKeypress = 0;

  currPage = 0;
  limit = 3;

  // constructor(private moviesSvc: MoviesService) { }

  prevkey: any;

  constructor(protected quoteService: QuoteService, protected router: Router) {
    super(quoteService, router);
  }

  ngOnInit() {
    this.quoteService.getRecordsPaginated(this.currPage, this.limit)
    .subscribe((x: any) => {
      this.records = x;
      this.prevkey = this.records[0]['id'];
    });
  }

  nextPage() {
    if (this.records.length < this.limit) { return; }
    this.prevkey = this.records[0]['id'];
    this.currPage = this.currPage + 1;
    this.quoteService.getRecordsPaginated(this.records[this.records.length - 1 ]['id'],
         this.limit)
    .subscribe((x: any) => {
      console.log(x);
      this.records = x;
    });
  }

  prevPage() {
    if (this.currPage === 0 ) { return; }
    this.currPage = this.currPage - 1;
    this.quoteService.getRecordsPaginated(this.prevkey,
     this.limit, true)
    .subscribe((x: any) => {
      console.log(x);
      this.records = x;
    });
  }

  search($event: any) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      const q = $event.target.value;
      this.startAt = q;
      this.endAt = q + '\uf8ff';
      console.log(this.startAt, this.endAt);
    }
    this.lastKeypress = $event.timeStamp;
  }
}
