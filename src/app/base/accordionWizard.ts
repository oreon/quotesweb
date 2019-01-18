import { Component, EventEmitter, OnInit, ViewChild, ViewChildren, QueryList, Output } from '@angular/core';

//import { environment } from '@env/environment';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { DataInputWidget } from '@app/base/DataInputWidget';

import { FormGroup } from '@angular/forms';

export abstract class AccordionWizard extends DataInputWidget{
    getTheForm():FormGroup{
        return null
      }
    
      @ViewChild('acc') acc: NgbAccordion;
      @ViewChildren('dw')  dataWidgets: QueryList<DataInputWidget>
      
      doneIds:number[] = []
    
      extractId = (sid:string) =>  parseInt(sid.split('')[1]) 
    
      isDisabled(id:string):boolean{
        
        //if (this.doneIds.includes(myId) || 
        // if(this.dataWidgets){
        // console.log(this.dataWidgets[myId -1])
        // console.log(myId + "-" + this.current)
        // return this.dataWidgets[myId -1].done || myId === this.current; 
        // }
        return false; 
      }
    
      current:number = 1;
      getActiveIds = () =>  "t" + this.current  
    
      setCurrent(current:number){
        this.current = current;
      }
    
      beforeChange(evt:any){
        this.setCurrent( this.extractId(evt.panelId))
      }
    
      goNext(event:any){
        console.log(event)
        this.doneIds.push(this.current) 
        this.current++;
        this.acc.toggle(this.getActiveIds());
        if(this.current  > this.acc.panels.length){
          this.stepComplete.emit(this.entity)
        }
      }
}