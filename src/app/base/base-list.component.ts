import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

import { BaseEntity } from './base';
import { BaseService } from './base.service';
import { BaseFireService } from '@app/base/base-fire-service.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';


export abstract class BaseListComponent<T extends BaseEntity> implements OnInit {

  entities: Observable< T[]>;
  errorMessage: string;
  response_status: number;
  is_insert = false;
  comments: any;

  offset = 2;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;


  @Input() cards = true;

  constructor(protected service: BaseFireService<T>, protected router: Router) {
    // this.$entities = <T[]>[];
  }


  nextPage() {
    this.prevKeys.push(_.first(this.comments)['$key']); // set current key as pointer for previous page
    this.getRecords(this.nextKey);
  }

  prevPage() {
    const prevKey = _.last(this.prevKeys); // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys); // then remove the last key in the array
    this.getRecords(prevKey);
  }
  fldChange(values: any) {
      this.cards = values.currentTarget.checked;
  }


  ngOnInit() {
    // this.records = this.service.getRecords(); // ( this.offset, 3);
  }

  delete(record: T) {
    if (confirm('sure you want to delete ?' ) ) { this.service.delete(record); }
  }

  // onNewUser(user: T){
  //   this.entities.push(user);
  //   this.showAddUser();
  // }

  showAdd() {
    console.log('Show add', this.service.url);
    this.router.navigate(['/' + this.service.url + '/add']);
  }

  showEdit(record: T) {
    this.router.navigate(['/' + this.service.url, record.id.toString(), 'edit']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

  protected getRecords(key?: any) {

    this.subscription = this.service.getRecordsPaginated( this.offset, key)
                       .subscribe(x => {
                         console.log(x);
                          this.comments = _.slice(x, 0, this.offset);
                          this.nextKey = _.get(x[this.offset], '$key');
    });
  }
}
