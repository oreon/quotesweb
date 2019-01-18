import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  user: Observable<firebase.User>;
  //items: FirebaseListObservable<any[]>;

  constructor(protected afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(
        x =>console.log(x)
      )
  }
}
