

import { BaseEntity } from '@app/base/base';
import * as _ from 'lodash';
import * as Chance from 'chance';
import * as Factory from 'factory.ts';



import {Gender} from '@app/enums/gender';

// change to class ?
export  interface Parent extends BaseEntity {
firstName: string;
lastName: string;
gender: Gender;
dob: Date;
image: string;
email: string;
city: string;
country: string;
bankInfo: string;
}

const chance = new Chance();

export const parentFactory = Factory.makeFactory<Parent>({
id: Factory.each(i => '' + i),
firstName : chance.last(),
lastName : chance.last(),
gender : Gender.MALE,
dob : chance.birthday(),
image : chance.last(),
email : chance.last(),
city : chance.last(),
country : chance.last(),
bankInfo : chance.last(),
dateCreated: null

});



