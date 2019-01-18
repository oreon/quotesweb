import { BaseEntity } from "@app/base/base";

import * as _ from 'lodash';
import * as Chance from 'chance';
import * as Factory from 'factory.ts'


export interface Quote extends BaseEntity {
    tags: string[]
    text: string
    explanation: string
    page: number
}

const chance = new Chance();

export const quoteFactory = Factory.makeFactory<Quote>({
    id: Factory.each((i:any) => '' + i),
    tags: ['one', 'two'],
    text: chance.paragraph(),
    explanation: chance.paragraph(),
    page: chance.integer({ min: 0, max: 20 }),
    dateCreated: null

});

