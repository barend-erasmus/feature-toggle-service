// Imports
import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';

// Imports services
import { GroupService } from './group';

// Imports repositories
import { MockGroupRepository } from './../repositories/mock/group';

// Imports domain models
import { Consumer } from './../models/consumer';
import { Group } from './../models/group';

describe('GroupService', () => {

    describe('create', () => {

        let createSpy: sinon.SinonSpy = null;
        let groupService: GroupService = null;

        beforeEach(() => {
            const groupRepository = new MockGroupRepository();

            createSpy = sinon.spy(groupRepository, 'create');

            sinon.stub(groupRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'group-2') {
                    return Promise.resolve(new Group('group-2', 'Group2', null, null));
                } else {
                    return Promise.resolve(null);
                }
            });

            groupService = new GroupService(groupRepository);
        });

        it('should return group given key does not exist', () => {

            return co(function*() {
                const result: Group = yield groupService.create('Group1', 'group-1');

                expect(result).to.be.not.null;
            });
        });

        it('should return null given key exist', () => {

            return co(function*() {
                const result: Group = yield groupService.create('Group2', 'group-2');

                expect(result).to.be.null;
            });
        });

        it('should return null given null key', () => {

            return co(function*() {
                const result: Group = yield groupService.create('Group1', null);

                expect(result).to.be.null;
            });
        });

        it('should return null given null name', () => {

            return co(function*() {
                const result: Group = yield groupService.create(null, 'group-1');

                expect(result).to.be.null;
            });
        });

        it('should call create in repository', () => {

            return co(function*() {
                const result: Group = yield groupService.create('Group1', 'group-1');

                sinon.assert.calledOnce(createSpy);
            });
        });
    });

    describe('list', () => {

        let groupService: GroupService = null;

        beforeEach(() => {
            const groupRepository = new MockGroupRepository();

            sinon.stub(groupRepository, 'list').callsFake(() => {
                return Promise.resolve([
                    new Group('group-1', 'group1', [], null),
                ]);
            });

            groupService = new GroupService(groupRepository);
        });

        it('should return list of projects', () => {

            return co(function*() {
                const result: Group[] = yield groupService.list();

                expect(result.length).to.be.eq(1);
            });
        });
    });

    describe('assignConsumers', () => {

        let updateSpy: sinon.SinonSpy = null;
        let groupService: GroupService = null;

        beforeEach(() => {
            const groupRepository = new MockGroupRepository();

            updateSpy = sinon.spy(groupRepository, 'update');

            sinon.stub(groupRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'group-2') {
                    return Promise.resolve(new Group('group-2', 'group2', [], null));
                } else {
                    return Promise.resolve(null);
                }
            });

            groupService = new GroupService(groupRepository);
        });

        it('should return false given group key does not exist', () => {

            return co(function*() {
                const result: boolean = yield groupService.assignConsumers('group-1', [
                    'consumer-1', 'consumer-2',
                ], null);

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return false given null consumer id', () => {

            return co(function*() {
                const result: boolean = yield groupService.assignConsumers('group-2', [
                    null,
                ], null);

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return true given group key does exist', () => {

            return co(function*() {
                const result: boolean = yield groupService.assignConsumers('group-2', [
                    'consumer-1', 'consumer-2',
                ], null);

                expect(result).to.be.true;
                sinon.assert.calledOnce(updateSpy);

                const group: Group = updateSpy.args[0][0];

                expect(group.consumers.length).to.be.eq(2);
            });
        });
    });

    describe('deassignGroups', () => {

        let updateSpy: sinon.SinonSpy = null;
        let groupService: GroupService = null;

        beforeEach(() => {
            const groupRepository = new MockGroupRepository();

            updateSpy = sinon.spy(groupRepository, 'update');

            sinon.stub(groupRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'group-2') {
                    return Promise.resolve(new Group('group-2', 'group2', [new Consumer('consumer-1', 'Consumer1', null)], null));
                } else {
                    return Promise.resolve(null);
                }
            });

            groupService = new GroupService(groupRepository);
        });

        it('should return false given group key does not exist', () => {

            return co(function*() {
                const result: boolean = yield groupService.deassignConsumers('group-1', [
                    'consumer-1',
                ], null);

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return false given null consumer key', () => {

            return co(function*() {
                const result: boolean = yield groupService.deassignConsumers('group-2', [
                    null,
                ], null);

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return true given group key does exist', () => {

            return co(function*() {
                const result: boolean = yield groupService.deassignConsumers('group-2', [
                    'consumer-1',
                ], null);

                expect(result).to.be.true;
                sinon.assert.calledOnce(updateSpy);

                const group: Group = updateSpy.args[0][0];

                expect(group.consumers.length).to.be.eq(0);
            });
        });
    });
});
