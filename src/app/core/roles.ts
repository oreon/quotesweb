import { BaseEntity } from '@app/base/base';

export interface Roles {
    reader: boolean;
    author?: boolean;
    admin?:  boolean;
  }

  export class User implements BaseEntity {
    id: string;
    email:    string;
    dateCreated: Date;
    // photoURL: string;
    roles:    Roles;

    constructor(authData: any) {
      this.email    = authData.email;
      // this.photoURL = authData.photoURL
      this.roles    = { reader: true };
    }
  }
