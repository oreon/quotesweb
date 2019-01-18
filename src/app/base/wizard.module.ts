import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, 
    ContentChildren, QueryList, ChangeDetectorRef, Inject, OnInit, forwardRef, ViewChildren, AfterViewInit, ContentChild} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { DataInputWidget } from './DataInputWidget';


@Component({
    selector: 'wizard-step',
    template: `
    <div [hidden]="hidden" [ngClass]="'ui-Wizard ui-widget ui-helper-reset'"  role="tablist">
        <ng-content></ng-content>
    </div>
    `
})
export class WizardStep implements AfterContentInit, OnInit {
    @Input() header: string;
    @Input() selected: boolean;
    @Input() disabled: boolean;
    @Input() hidden:boolean =true
    @Output() selectedChange: EventEmitter<any> = new EventEmitter();

    @ContentChildren("dw") children: QueryList<DataInputWidget>
  
    ngAfterContentInit() {
      console.log("called")
      this.children.forEach(child =>{
        child.stepComplete.subscribe( (x:any) => this.selectedChange.emit(x))
        this.hidden = true
      } );
      //console.log(this.alerts.first)
    }

    shouldShow = false;
 
    show() { this.shouldShow = true; }

    ngOnInit(){
        //console.log(this.alerts.first)
        //this.alerts.first.stepComplete.subscribe(x => console.log(x));
    }

   // @ContentChildren(Header) headerFacet: QueryList<Header>;

}    

@Component({
    selector: 'wizard',
    template: `
        <div [ngClass]="'ui-widget ui-helper-reset'"  role="tablist">
            <ng-content></ng-content>
        </div>
    `
})
export class Wizard implements  AfterContentInit, OnDestroy {
    
    @Input() multiple: boolean;
    
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onOpen: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() expandIcon: string = 'pi pi-fw pi-caret-right';

    @Input() collapseIcon: string = 'pi pi-fw pi-caret-down';
    
    @Input() lazy: boolean;


    tabListSubscription: Subscription;
    
    private _activeIndex: number = 0;
    
    public tabs: WizardStep[] = [];

    constructor(public el: ElementRef, public changeDetector: ChangeDetectorRef) {}

    @ContentChildren(WizardStep) tabList: QueryList<WizardStep>;

    ngAfterContentInit() {
        this.initTabs();

        this.tabList.forEach(tab =>{
            tab.selectedChange.subscribe( (x:any) => {
              this._activeIndex++;  
              this.updateSelectionState()
            }    
            //this.hidden = true
        )});

        this.tabListSubscription = this.tabList.changes.subscribe(_ => {
            this.initTabs();
            this.changeDetector.markForCheck();
        });
    }

    initTabs(): any {
        this.tabs = this.tabList.toArray();
        this.updateSelectionState();
    }
      
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    } 
    
    @Input() get activeIndex(): any {
        return this._activeIndex;
    }

    set activeIndex(val: any) {
        this._activeIndex = val;
        this.updateSelectionState();
    }

    done():boolean {
        return this._activeIndex >= this.tabs.length
    }

    updateSelectionState() {
        console.log(this._activeIndex)
        for (let i = 0; i < this.tabs.length; i++) {
            console.log(this.tabs[i])
            if(i ==  this._activeIndex){
                this.tabs[i].hidden = false
            }else 
                this.tabs[i].hidden = true
        }
        
        // if (this.tabs && this.tabs.length && this._activeIndex != null) {
        //     for (let i = 0; i < this.tabs.length; i++) {
        //         let selected =  i === this._activeIndex;
        //         let changed = selected !== this.tabs[i].selected;

        //         if (changed) {
        //             //this.tabs[i].animating = true;
        //         }

        //         this.tabs[i].selected = selected;
        //         this.tabs[i].selectedChange.emit(selected);
        //     }
        // }
    }


    ngOnDestroy() {
        if(this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Wizard,WizardStep, ],
    declarations: [Wizard,WizardStep]
})
export class WizardModule { }