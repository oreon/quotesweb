import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteManageComponent } from './entity$-manage.component';

describe('QuoteManageComponent', () => {
  let component: QuoteManageComponent;
  let fixture: ComponentFixture<QuoteManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});