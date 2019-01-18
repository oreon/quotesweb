import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteManageComponent } from './quote-manage.component';
import { QuoteAddComponent } from '@app/quote/quote-add/quote-add.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuoteService } from '@app/quote/quote.service';
import { FirestoreService } from '@app/base/firestore.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticationService } from '@app/core';


const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};



describe('QuoteManageComponent', () => {
  let component: QuoteManageComponent;
  let fixture: ComponentFixture<QuoteManageComponent>;
  let service: FirestoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, NgbModule.forRoot(), NgSelectModule],

      declarations: [ QuoteManageComponent, QuoteAddComponent ],
      providers: [
        QuoteService,,
        FlashMessagesService,
        AuthenticationService,
        { provide: AngularFirestore, useValue: FirestoreStub },
        //FirestoreService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(FirestoreService);

    spyOn(service, 'add').and.returnValue( of(null))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
