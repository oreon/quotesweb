

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { BaseService } from '../base/base.service';
import { BaseFireService } from '@app/base/base-fire-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '@app/base/firestore.service';
import { AuthenticationService } from '@app/core';
import { User } from '@app/core/roles';

@Injectable({
  providedIn: "root"
})
export class UserService extends BaseFireService<User> {

  entity_url = this.getCollName()

  constructor(public afs: FirestoreService,
    protected messages: FlashMessagesService,
    protected authService: AuthenticationService) {
    super(afs, messages)
  }

  getCollName() {
    console.log('usersColl  called')
    return 'users'
  }

  addUser(u: User) {
    this.addWithColl(u, 'users')
  }

}