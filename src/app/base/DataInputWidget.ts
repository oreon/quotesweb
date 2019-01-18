import { CommonModule } from '@angular/common';

import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, 
    ContentChildren, QueryList, ChangeDetectorRef, Inject, OnInit, forwardRef} from '@angular/core';

import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import * as _ from 'lodash';

export abstract class DataInputWidget{

    @Input() entity:any
    @Output() stepComplete = new EventEmitter<any>();
    done:boolean = false;

    abstract getTheForm():FormGroup
    //abstract createForm():void; 

    constructor(){
        this.entity = {};
        //this.createForm();
    }
    
    submit(){
        Object.keys(this.getTheForm().controls).forEach(field =>
            this.getTheForm().get(field).markAsTouched()
        );
        //this.stepComplete.emit("success");
        console.log(this.getTheForm().value)
        if(this.getTheForm().valid){
            _.assign(this.entity, this.getTheForm().value)
            console.log(this.entity)
            this.done = true;
            this.stepComplete.emit(this.entity);
            this.getTheForm().reset();
        }
    }
}