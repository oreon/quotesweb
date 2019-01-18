import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '@app/base/base-edit.component';
import { Quote } from '@app/quote/quote';
import { QuoteService } from '@app/quote/quote.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quote-manage',
  templateUrl: './quote-manage.component.html',
  styleUrls: ['./quote-manage.component.scss']
})
export class QuoteManageComponent extends BaseEditComponent<Quote> implements OnInit {

  constructor(protected quoteService: QuoteService, 
    protected route: ActivatedRoute, protected router: Router) {
    super(quoteService, route, router, 'quotes')
    //this.createForm();
}

  ngOnInit() {
    super.ngOnInit()
  }

}
