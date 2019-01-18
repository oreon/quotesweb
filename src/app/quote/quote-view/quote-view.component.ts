
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Quote} from "../quote";

import { BaseViewComponent } from '@app/base/base-view.component';

@Component({
selector: 'quote-view',
templateUrl: './quote-view.component.html',
styleUrls: ['./quote-view.component.css']
})
export class QuoteViewComponent extends BaseViewComponent<Quote> implements OnInit {

}