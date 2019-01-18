

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { Quote } from './quote';
import { BaseService } from '../base/base.service';
import { BaseFireService } from '@app/base/base-fire-service.service';
import { AuthenticationService } from '@app/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirestoreService } from '@app/base/firestore.service';

@Injectable()
export class QuoteService extends BaseFireService<Quote> {

  entity_url = this.getCollName();

  constructor(public afs: FirestoreService,
    protected messages: FlashMessagesService,
    protected authService: AuthenticationService) {
    super(afs, messages);
  }

  getMovies(start: any, end: any) {
    // if(!start)
      start = 'egotism';
    console.log(start);
    return this.afs.colWithIds$(this.getCollName(), (ref: any) =>
    ref
      .where('tags', 'array-contains', start)
  );
  }

  getCollName() {
    return 'quotes';
  }

}
