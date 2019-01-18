import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListViewComponent } from './quote-list-view.component';
import { QuoteAddComponent } from '@app/quote/quote-add/quote-add.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

fdescribe('QuoteListViewComponent', () => {
  let component: QuoteListViewComponent;
  let fixture: ComponentFixture<QuoteListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, NgbModule.forRoot(), NgSelectModule],
      declarations: [ QuoteListViewComponent, QuoteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
