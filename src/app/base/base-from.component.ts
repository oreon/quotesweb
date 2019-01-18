import { Output, EventEmitter, Input } from "@angular/core";
import { BaseEntity } from "@app/base/base";
import * as _ from "lodash";
import { FormGroup } from "@angular/forms";

export abstract class BaseFormComponent<T extends BaseEntity> {
  @Output() formSubmitted: EventEmitter<BaseEntity> = new EventEmitter();
  @Input() entity: T = <T>{};
  @Input() stepComplete: EventEmitter<BaseEntity> = new EventEmitter();

  errorMessage: string;
  id: any;

  public compareFn(e1: BaseEntity, e2: BaseEntity) {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  form2Entity() {
    _.assign(this.entity, this.getForm().value);
  }

  submit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.getForm().invalid) {
      return;
    }
    console.log(this.getForm().value);
    this.form2Entity();
    this.formSubmitted.emit(this.entity);
    this.stepComplete.emit(this.entity);
  }

  get f() {
    return this.getForm().controls;
  }

  abstract getForm(): FormGroup;
  //getForm(): any { return null}
}
