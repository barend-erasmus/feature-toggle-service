// Imports
import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';

// Imports services
import { ConsumerService } from './consumer';

// Imports repositories
import { MockConsumerRepository } from './../repositories/mock/consumer';

// Imports domain models
import { Consumer } from './../models/consumer';
import { Group } from './../models/group';

describe('ConsumerService', () => {

    describe('list', () => {

        let consumerService: ConsumerService = null;

        beforeEach(() => {
            const consumerRepository = new MockConsumerRepository();

            sinon.stub(consumerRepository, 'listByProjectKey').callsFake((projectKey: string) => {
                if (projectKey === 'project-1') {
                    return Promise.resolve([
                        new Consumer('1', 'User1'),
                    ]);
                }
            });

            consumerService = new ConsumerService(consumerRepository);
        });

        it('should return list of users', () => {

            return co(function*() {
                const listResult: Consumer[] = yield consumerService.list('project-1');

                expect(listResult.length).to.be.eq(1);
            });
        });
    });
});
