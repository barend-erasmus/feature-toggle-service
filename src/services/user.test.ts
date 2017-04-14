// Imports
import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';

// Imports services
import { UserService } from './user';

// Imports repositories
import { MockUserRepository } from './../repositories/mock/user';

// Imports domain models
import { User } from './../models/user';

describe('UserService', () => {

    describe('list', () => {

        let userService: UserService = null;

        beforeEach(() => {
            const userRepository = new MockUserRepository();

            sinon.stub(userRepository, 'listByProjectId').callsFake((projectId: string) => {
                if (projectId === '1') {
                    return Promise.resolve([
                        new User('1', 'User1'),
                    ]);
                }
            });

            userService = new UserService(userRepository);
        });

        it('should return list of users', () => {

            return co(function*() {
                const listResult: User[] = yield userService.list('1');

                expect(listResult.length).to.be.eq(1);
            });
        });
    });

});
