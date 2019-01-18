import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import { map } from 'rxjs/operators';


import { FirestoreService } from '@app/base/firestore.service';

export interface Credentials {
  // Customize received credentials here
  email: string;
  password: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  public get isAuthenticated$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user: any) => user !== null));
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }
 // private userProfile: Parent

  // constructor() {
  //   const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
  //   if (savedCredentials) {
  //     this._credentials = JSON.parse(savedCredentials);
  //   }
  // }


  // login(context: LoginContext): Observable<Credentials> {
  //   // Replace by proper authentication call
  //   const data = {
  //     username: context.username,
  //     token: '123456'
  //   };
  //   this.setCredentials(data, context.remember);
  //   return of(data);
  // }

  // user: Observable<firebase.User>;
  localUser: firebase.User;

  private _credentials: Credentials | null;
  // items: FirebaseListObservable<any[]>;

  constructor(public afAuth: AngularFireAuth,
    protected messages: FlashMessagesService,
    public afs: FirestoreService) {
    this.afAuth.authState.subscribe(user => {
      this.localUser = user;
    });

    console.log(this.localUser);
  }

  login(context: LoginContext) {
     return this.afAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(context.username,
        context.password)
        .then(user => user
          // this.afs.doc$('parents/' + user.user.uid).subscribe(
          //     (x: any) => this.userProfile = x
          //   )
          )  ;

  }

  register(email: string, password: string): Promise<any> {
   console.log(email, password);
    return this.afAuth.auth
      .createUserWithEmailAndPassword(
        email,
        password,
      ).then(user => user
        // this.afs.doc$('parents/' + user.user.uid).subscribe(
        //     (x: any) => this.userProfile = x
        //   )
        )  ;
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    // this.setCredentials();
    this.afAuth.auth.signOut();
    this.localUser = null;
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.localUser;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
