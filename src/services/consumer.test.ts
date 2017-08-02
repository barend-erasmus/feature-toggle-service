// Imports
import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';

// Imports services
import { ConsumerService } from './consumer';

// Imports repositories
import { ConsumerRepository } from './../repositories/memory/consumer';

// Imports domain models
import { Consumer } from './../models/consumer';
import { Group } from './../models/group';

describe('ConsumerService', () => {

    describe('list', () => {

        it('should return list of users', () => {

            return co(function* () {

                const consumerRepository = new ConsumerRepository();
                const consumerService = new ConsumerService(consumerRepository);

                const result: Consumer[] = yield consumerService.list('project-1');

                expect(result.length).to.be.eq(1);
            });
        });
    });
});
