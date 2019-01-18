

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { Parent } from './parent';
import { BaseService } from '../base/base.service';
import { BaseFireService } from '@app/base/base-fire-service.service';
import { FirestoreService } from '@app/base/firestore.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticationService } from '@app/core';

@Injectable()
export class ParentService extends BaseFireService<Parent> {

  entity_url = this.getCollName()

  constructor(public afs: FirestoreService,
    protected messages: FlashMessagesService,
    protected authService: AuthenticationService) {
    super(afs, messages)
  }

  getCollName() {
    return 'parents'
  }
}