import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from "@angular/router";
import { BaseEntity } from './base';
import { BaseService } from './base.service';
import { BaseFireService } from '@app/base/base-fire-service.service';

//import { DisplayMessage } from '../shared/models/display-message';


export abstract class BaseEditComponent<T extends BaseEntity> implements OnInit {

  entity: T
  errorMessage: string;
  id: any
  //get f() { return this.getTheForm().controls; }

  public compareFn(e1: BaseEntity, e2: BaseEntity) {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  /**
* Boolean used in telling the UI
* that the form has been submitted
* and is awaiting a response
*/
  submitted = false;

  /**
   * Notification message from received
   * form request or router
   */
  //notification: DisplayMessage;

  //@Output() onNew = new EventEmitter<T>();
  constructor(protected service: BaseFireService <T>,
    protected route: ActivatedRoute,
    protected router: Router,
    protected url: string) {
    // super();
    this.entity = <T>{};
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    if (this.id) {
      this.service.getById(this.id).subscribe(
        (u: any) => this.entity = u,
       ( error: any) => { console.log(error); this.errorMessage = <any>error });
    }
  }

  getEntity() {
    return this.entity
  }

  onSubmit(entity: T) {

    const id = this.route.snapshot.params['id']
    console.log(entity)

    if (!this.id) {
      this.service.add(entity)
      this.onBack();
    } else {
      entity.id = this.id
      this.service.update(entity)
      this.onBack();
    }

  }

  onBack() {
    this.router.navigate(['/' + this.service.getCollName()]);
  }

}