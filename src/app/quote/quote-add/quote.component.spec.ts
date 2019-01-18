import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { quoteFactory } from '../quote';

import { QuoteAddComponent } from './quote-add.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

fdescribe('QuoteAddComponent', () => {
    let component: QuoteAddComponent;
    let fixture: ComponentFixture<QuoteAddComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuoteAddComponent],
            imports: [ReactiveFormsModule, FormsModule, NgbModule.forRoot(), NgSelectModule],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        this.entity = quoteFactory.build();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () => {
        expect(component.getForm().valid).toBeFalsy();
    });

    it('form valid when editing existing', () => {
        component.entity = this.entity
        fixture.detectChanges();
        expect(component.getForm().valid).toBeTruthy();
    });



    it('submitting a form emits a valid entity', () => {
        expect(component.getForm().valid).toBeFalsy();

        component.getForm().controls['tags'].setValue(this.entity.tags)
        component.getForm().controls['text'].setValue(this.entity.text)
        component.getForm().controls['explanation'].setValue(this.entity.explanation)
        component.getForm().controls['page'].setValue(this.entity.page)

        expect(component.getForm().valid).toBeTruthy();

        component.stepComplete.subscribe((emitted: any) => {
            expect(emitted.tags).toBe(this.entity.tags);
            expect(emitted.text).toBe(this.entity.text);
            expect(emitted.explanation).toBe(this.entity.explanation);
            expect(emitted.page).toBe(this.entity.page);
        });

        // Trigger the login function
        component.submit();
    });
});