import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  parentFactory } from '../parent';

import { ParentAddComponent } from './parent-add.component';


import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

describe('ParentAddComponent', () => {
let component: ParentAddComponent;
let fixture: ComponentFixture<ParentAddComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ParentAddComponent ],
        imports: [ReactiveFormsModule, FormsModule,NgbModule.forRoot(), NgSelectModule],

    })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ParentAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        this.entity = parentFactory.build();
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

component.getForm().controls['firstName'].setValue(this.entity.firstName)
component.getForm().controls['lastName'].setValue(this.entity.lastName)
component.getForm().controls['gender'].setValue(this.entity.gender)
component.getForm().controls['dob'].setValue(this.entity.dob)
component.getForm().controls['image'].setValue(this.entity.image)
component.getForm().controls['email'].setValue(this.entity.email)
component.getForm().controls['city'].setValue(this.entity.city)
component.getForm().controls['country'].setValue(this.entity.country)
component.getForm().controls['bankInfo'].setValue(this.entity.bankInfo)

        expect(component.getForm().valid).toBeTruthy();

        component.stepComplete.subscribe((emitted:any) => {
expect(emitted.firstName).toBe(this.entity.firstName);
expect(emitted.lastName).toBe(this.entity.lastName);
expect(emitted.gender).toBe(this.entity.gender);
expect(emitted.dob).toBe(this.entity.dob);
expect(emitted.image).toBe(this.entity.image);
expect(emitted.email).toBe(this.entity.email);
expect(emitted.city).toBe(this.entity.city);
expect(emitted.country).toBe(this.entity.country);
expect(emitted.bankInfo).toBe(this.entity.bankInfo);
        });

        // Trigger the login function
        component.submit();
    });
});