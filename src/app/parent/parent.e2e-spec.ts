
// import { browser, element, by } from 'protractor';

// import { BasePO, txtByCss } from '../base.po';

// import { BaseEntity } from "@app/base/base";
// import * as _ from 'lodash';
// import * as Chance from 'chance';
// import * as Factory from 'factory.ts'



// import {Gender} from "@app/enums/gender";

// //change to class ?
// export  interface Parent extends BaseEntity{
// firstName : string
// lastName : string
// gender : Gender
// dob : Date
// image : string
// email : string
// city : string
// country : string
// bankInfo : string
// }

// let chance = new Chance();

// export const parentFactory = Factory.makeFactory<Parent>({
// id: Factory.each(i => ''+ i),
// firstName : chance.last(),
// lastName : chance.last(),
// gender : Gender.MALE,
// dob : chance.birthday(),
// image : chance.last(),
// email : chance.last(),
// city : chance.last(),
// country : chance.last(),
// bankInfo : chance.last(),

// });



// export class ManageParents extends BasePO{

//     entity: Parent = parentFactory.build();
//     name = 'parents'

//     getEntity(){ return this.entity;}
//     getName(){return this.name}
// }

// describe('manageParent', () => {
//     let page: ManageParents;

//     beforeEach(() => {
//         page = new ManageParents();
//     });

//     it('should display add  page and create entty', () => {
//         page.navigateTo();
//         expect(browser.getCurrentUrl()).toContain('/parents/add');
//         page.submit();
//     });
// });


// export class ListParents  {
//     name = 'parents'
//     getName(){ return this.name }

//     constructor(){
//     browser.get(`/${this.getName()}`);
//     }
// }

// describe('listParent', () => {
//     let page: ListParents;

//     beforeEach(() => {
//         page = new ListParents();
//     });

//     it('should display add  page and create entty', () => {
//         //page.navigateTo();
//         expect(browser.getCurrentUrl()).toContain('/parents');
//         expect(txtByCss("h2")).toContain("Parents")
//     });
// })