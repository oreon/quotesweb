

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { QuoteListComponent} from './quote-list/quote-list.component';
import { QuoteAddComponent} from './quote-add/quote-add.component';
import { QuoteManageComponent } from '@app/quote/quote-manage/quote-manage.component';
// import { QuoteEditComponent} from './quote-edit/quote-edit.component';
import { extract } from '@app/core';

import { Shell } from '@app/shell/shell.service';

const quoteRoutes: Routes = [
  Shell.childRoutes([
  {path: 'quotes', component: QuoteListComponent},
  {path: 'quotes/add', component: QuoteManageComponent},
  {path: 'quotes/:id/edit', component: QuoteManageComponent}
  ])
];

@NgModule({
  imports: [RouterModule.forChild(quoteRoutes)],
  exports: [RouterModule]
})

export class QuoteRoutingModule {
}
