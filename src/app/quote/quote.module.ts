import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuoteService} from './quote.service';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteAddComponent } from './quote-add/quote-add.component';
// import { QuoteEditComponent } from './quote-edit/quote-edit.component';
import { QuoteRoutingModule} from './quote-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { QuoteViewComponent } from '@app/quote/quote-view/quote-view.component';
import { QuoteManageComponent } from './quote-manage/quote-manage.component';
import { QuoteListViewComponent } from './quote-list-view/quote-list-view.component';

// import { JsonSchemaFormModule }               from 'angular2-json-schema-form';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    QuoteRoutingModule,
    HttpModule
  ],
  declarations: [
    QuoteListComponent,
    QuoteAddComponent,
    QuoteViewComponent,
    QuoteManageComponent,
    QuoteListViewComponent
    ],
  exports: [
    QuoteListComponent,
    QuoteAddComponent,
  ],
  providers: [QuoteService]
})
export class QuoteModule {
}
