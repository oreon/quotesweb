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
        expect(component.getForm().valid).toBeTruthy();
    });



    it('submitting a form emits a valid entity', () => {
        expect(component.getForm().valid).toBeFalsy();

component.f.controls['firstName'].setValue(this.entity.firstName)
component.f.controls['lastName'].setValue(this.entity.lastName)
component.f.controls['gender'].setValue(this.entity.gender)
component.f.controls['dob'].setValue(this.entity.dob)
component.f.controls['email'].setValue(this.entity.email)
component.f.controls['city'].setValue(this.entity.city)
component.f.controls['country'].setValue(this.entity.country)
component.f.controls['bankInfo'].setValue(this.entity.bankInfo)

        expect(component.getForm().valid).toBeTruthy();

        component.stepComplete.subscribe((emitted:any) => {
expect(emitted.firstName).toBe(this.entity.firstName);
expect(emitted.lastName).toBe(this.entity.lastName);
expect(emitted.gender).toBe(this.entity.gender);
expect(emitted.dob).toBe(this.entity.dob);
expect(emitted.email).toBe(this.entity.email);
expect(emitted.city).toBe(this.entity.city);
expect(emitted.country).toBe(this.entity.country);
expect(emitted.bankInfo).toBe(this.entity.bankInfo);
        });

        // Trigger the login function
        component.submit();
    });
});