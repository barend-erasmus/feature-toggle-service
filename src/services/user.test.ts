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
import { UserGroup } from './../models/user-group';

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

    describe('createUserGroup', () => {

        let createUserGroupSpy: sinon.SinonSpy = null;
        let userService: UserService = null;

        beforeEach(() => {
            const userRepository = new MockUserRepository();

            createUserGroupSpy = sinon.spy(userRepository, 'createUserGroup');

            sinon.stub(userRepository, 'findUserGroupByKey').callsFake((key: string) => {
                if (key === 'user-group-2') {
                    return Promise.resolve(new UserGroup('2', 'UserGroup2', 'user-group-2'));
                }else {
                    return Promise.resolve(null);
                }
            });

            userService = new UserService(userRepository);
        });

        it('should return user group given key does not exist', () => {

            return co(function*() {
                const createUserGroupResult: UserGroup = yield userService.createUserGroup('UserGroup1', 'user-group-1');

                expect(createUserGroupResult).to.be.not.null;
            });
        });

        it('should return null given key exist', () => {

            return co(function*() {
                const createUserGroupResult: UserGroup = yield userService.createUserGroup('UserGroup2', 'user-group-2');

                expect(createUserGroupResult).to.be.null;
            });
        });

        it('should call createUserGroup in repository', () => {

            return co(function*() {
                const createUserGroupResult: UserGroup = yield userService.createUserGroup('UserGroup1', 'user-group-1');

                sinon.assert.calledOnce(createUserGroupSpy);
            });
        });
    });

});
