import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, 
    ContentChildren, QueryList, ChangeDetectorRef, Inject, OnInit, forwardRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import * as _ from 'lodash';
import { DataInputWidget } from '@app/base/DataInputWidget';
import { CommonComponentsModule, ShowConfirmation } from '@app/base/common-components';

export interface Person{
    id:number
    firstName:string
    lastName:string

    getName():string
}

export class PersonImp implements Person{
    id:number
    firstName:string
    lastName:string

    constructor(p:Person){
        _.assign(this, p);
    }

    getName():string{
        return this.firstName + " " + this.lastName
    }
}



@Component({
    selector: 'person-list',
    template: `
    <div>
    <confirm-dlg #cd [recordName]="getCurrentPersonName()" (selected)="deleteMsgDone($event)" ></confirm-dlg>
    <h2>
        <span translate>Persons</span>
    </h2>
    <div class="row">
    </div>
    <br/>
    <div class="table-responsive" *ngIf="entities">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>
                        <span translate>firstName</span>
                        <span class="fa fa-sort"></span>
                    </th>
                    <th>
                        <span translate>lastName</span>
                        <span class="fa fa-sort"></span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let e of entities;let i = index ">
                   <td> {{e.firstName}}</td>
                    <td> {{e.lastName}}</td>
                    <td class="text-right">
                        <button class="btn btn-default" (click)="edit(e)">Edit</button>
                        <button class="btn btn-default" (click)="cd.show = true; delete(i)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
   
</div>
    `,
  })
  export class PersonListWidget  extends DataInputWidget implements OnInit  {
  
    errorMessage: string;
    public tripForm: FormGroup;
    @Input() entities:Person[]
    @Output() selected = new EventEmitter<Person>();
    
    getTheForm():FormGroup {return null}
  
    constructor(protected fb: FormBuilder){ 
      super(); 
     }

    edit( p:Person){
        this.selected.emit(p);
    }

    currentDeleteIndex:number
    getCurrentPersonName(){
        return new PersonImp(this.entities[this.currentDeleteIndex]).getName()
    }

    performDelete( i:number){
        this.entities.splice(i, 1);
    }

    deleteMsgDone(evt:boolean){
        if(evt === true)
            this.performDelete(this.currentDeleteIndex)
    }

    delete(i:number){
       // this.confirmDialog.show = true
        this.currentDeleteIndex = i;
    }

    showAdd(){
        this.selected.emit(null);
    }

    ngOnInit(){}
  
  }

  @Component({
    selector: 'person-edit',
    template: `
    <div class="container-wrapper container d-flex justify-content-center align-items-center">
    <div class="form-wrapper text-center" style="width: 80%; background-color: #eef ; padding: 1.5em">
        <h2 class="text-center"> {{ entity.id ? 'Edit':'Add'}}  person </h2>
        <form [formGroup]="personForm" (submit)="submit()" novalidate>
            
            <div class="form-group">
                <label for="firstName-input"><span translate>firstName</span></label>
<input type="text" class="form-control"     formControlName="firstName"  id="firstName-input"  [ngModel]="entity.firstName"
>
                <div class="alert alert-danger" *ngIf="personForm.get('firstName').errors && personForm.get('firstName').touched">
                    <p *ngIf="personForm.get('firstName').errors.required">Required !</p>
                    <p *ngIf="personForm.get('firstName').errors.pattern">Invalid input!</p>
                </div>
            </div>

            <div class="form-group">
                <label for="lastName-input"><span translate>lastName</span></label>
<input type="text" class="form-control"     formControlName="lastName"  id="lastName-input"  [ngModel]="entity.lastName"
>
                <div class="alert alert-danger" *ngIf="personForm.get('lastName').errors && personForm.get('lastName').touched">
                    <p *ngIf="personForm.get('lastName').errors.required">Required !</p>
                    <p *ngIf="personForm.get('lastName').errors.pattern">Invalid input!</p>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>
    `,
  })
  export class PersonEditWidget extends DataInputWidget implements OnInit  {
  
    errorMessage: string;
    public personForm: FormGroup;
    

    getTheForm():FormGroup {return this.personForm}
  
    constructor(protected fb: FormBuilder){ 
      super(); 
      this.createForm();
     }

    ngOnInit(){}
  
    private createForm(): void {
        this.personForm= this.fb.group({
        firstName : ['', [  Validators.required ]],
        lastName : ['', [  Validators.required ]],
        });
    }

  }



  @Component({
    selector: 'person-widget',
    template: `
    <div class="container-wrapper container d-flex justify-content-center align-items-center">
    {{editing}}
  
    <button [hidden]= "entities.length >= max"   class="btn btn-primary float-right" (click)="editPerson(null)">
        <span class="fa fa-plus"></span> <span translate>Create new</span>
    </button>
    <person-list  [entities]= "entities" (selected)="editPerson($event)" ></person-list>
    <person-edit [hidden]="!showAddEdit()" (stepComplete)="addPerson($event)" [entity]="entity"></person-edit>
    </div>
    `,
  })
  export class PersonWidget extends DataInputWidget implements OnInit  {
  
    errorMessage: string;
    public personForm: FormGroup;
    @Input() entities:Person[] = []
    @Input() max:number = 5
    editing:boolean = false

    getTheForm():FormGroup {return null}

    
  
    constructor(protected fb: FormBuilder){ 
      super(); 
      //this.createForm();
     }

    ngOnInit(){}
  
    addPerson( p:Person){
        console.log(p)
        if(p['id'] === undefined){
            p['id'] = new Date().getTime();
            this.entities.push( p);
        }
        this.entities = _.uniqBy(this.entities, 'id');
        this.entity ={}
        console.log(this.entities)
        this.editing = false;
    }

    editPerson(p:Person){
        if(p) this.entity = p;
        this.editing = true;
    }

    showAddEdit = ():boolean => this.editing 

  }


@NgModule({
    imports: [CommonModule, ReactiveFormsModule, CommonComponentsModule],
    exports: [PersonListWidget, PersonWidget, PersonEditWidget],
    declarations: [PersonListWidget, PersonWidget,PersonEditWidget]
})
export class MyCompsModule { }