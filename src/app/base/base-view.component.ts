import { Output, EventEmitter, Input } from "@angular/core";
import { BaseEntity } from "@app/base/base";
import * as _ from 'lodash';

export abstract class BaseViewComponent<T extends BaseEntity> {
    @Input() entity: T;
    
    @Output() editClicked = new EventEmitter<BaseEntity>();
    @Output() deleteClicked = new EventEmitter<BaseEntity>();

    ngOnInit(){}

    edit(){
        this.editClicked.emit(this.entity)
    }

    delete(){
        this.deleteClicked.emit(this.entity)
    }

}