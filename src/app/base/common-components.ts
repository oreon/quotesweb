import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, 
    ContentChildren, QueryList, ChangeDetectorRef, Inject, OnInit, forwardRef} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'confirm-dlg',
    template: `
    <div id="confirmDlg" [hidden]="!show" class="alert alert-danger" role="alert"> Sure you want to delete {{recordName}}? 
        <a (click)="doYes()"  class="alert-link"> Yes </a>  
        <a (click)="hide()" class="alert-link"> No </a>  
    <div>`
})
export class ShowConfirmation{
    
    @Output() selected = new EventEmitter<boolean>();
    @Input() recordName :string
    show:boolean = false

    doYes(){
        this.selected.emit(true);
        this.show = false
    }

    hide(){
        this.selected.emit(false);
        this.show = false
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ShowConfirmation],
    declarations: [ShowConfirmation]
})
export class CommonComponentsModule { }