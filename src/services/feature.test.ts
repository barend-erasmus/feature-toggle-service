// Imports
import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';

// Imports services
import { FeatureService } from './feature';

// Imports repositories
import { MockFeatureRepository } from './../repositories/mock/feature';
import { MockProjectRepository } from './../repositories/mock/project';

// Imports domain models
import { Feature } from './../models/feature';
import { FeatureGroup } from './../models/feature-group';
import { Project } from './../models/project';

describe('FeatureService', () => {

    describe('list', () => {

        let featureService: FeatureService = null;

        beforeEach(() => {
            const featureRepository = new MockFeatureRepository();
            const projectRepository = new MockProjectRepository();

            sinon.stub(featureRepository, 'listByProjectKey').callsFake((projectKey: string) => {
                if (projectKey === 'project-1') {
                    return Promise.resolve([
                        new Feature('feature-1', 'Feature1', null, null, null),
                    ]);
                }
            });

            featureService = new FeatureService(featureRepository, projectRepository);
        });

        it('should return list of features', () => {

            return co(function*() {
                const result: Feature[] = yield featureService.list('project-1');

                expect(result.length).to.be.eq(1);
            });
        });
    });

    describe('create', () => {

        let createSpy: sinon.SinonSpy = null;
        let featureService: FeatureService = null;

        beforeEach(() => {
            const featureRepository = new MockFeatureRepository();
            const projectRepository = new MockProjectRepository();

            createSpy = sinon.spy(featureRepository, 'create');

            sinon.stub(featureRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'feature-2') {
                    return Promise.resolve(new Feature('feature-2', 'feature2', null, null, null));
                } else {
                    return Promise.resolve(null);
                }
            });

            sinon.stub(projectRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'project-1') {
                    return Promise.resolve(new Project('prject-1', 'project1'));
                } else {
                    return Promise.resolve(null);
                }
            });

            featureService = new FeatureService(featureRepository, projectRepository);
        });

        it('should return feature given feature key does not exist', () => {

            return co(function*() {
                const result: Feature = yield featureService.create('feature1', 'feature-1', 'normal', 'project-1');

                expect(result).to.be.not.null;
                sinon.assert.calledOnce(createSpy);
            });
        });

        it('should return null given feature key does exist', () => {

            return co(function*() {
                const result: Feature = yield featureService.create('feature2', 'feature-2', 'normal', 'project-1');

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });

        it('should return null given null name', () => {

            return co(function*() {
                const result: Feature = yield featureService.create(null, 'feature-1', 'normal', 'project-1');

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });

        it('should return null given null key', () => {

            return co(function*() {
                const result: Feature = yield featureService.create('feature1', null, 'normal', 'project-1');

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });

        it('should return null given null type', () => {

            return co(function*() {
                const result: Feature = yield featureService.create('feature1', 'feature-1', null, 'project-1');

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });

        it('should return null given null project key', () => {

            return co(function*() {
                const result: Feature = yield featureService.create('feature1', 'feature-1', 'normal', null);

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });

        it('should return null given project key does not exist', () => {

            return co(function*() {
                const result: Feature = yield featureService.create('feature1', 'feature-1', 'nromal', 'project-2');

                expect(result).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });
    });

    describe('toggle', () => {

        let updateSpy: sinon.SinonSpy = null;
        let featureService: FeatureService = null;

        beforeEach(() => {
            const featureRepository = new MockFeatureRepository();
            const projectRepository = new MockProjectRepository();

            updateSpy = sinon.spy(featureRepository, 'update');

            sinon.stub(featureRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'feature-2') {
                    return Promise.resolve(new Feature('feature-2', 'feature2', null, null, null));
                } else {
                    return Promise.resolve(null);
                }
            });

            featureService = new FeatureService(featureRepository, projectRepository);
        });

        it('should return false given feature key does not exist', () => {

            return co(function*() {
                const result: boolean = yield featureService.toggle('feature-1');

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return true given feature key does exist', () => {

            return co(function*() {
                const result: boolean = yield featureService.toggle('feature-2');

                expect(result).to.be.true;
                sinon.assert.calledOnce(updateSpy);
            });
        });
    });

    describe('assignGroups', () => {

        let updateSpy: sinon.SinonSpy = null;
        let featureService: FeatureService = null;

        beforeEach(() => {
            const featureRepository = new MockFeatureRepository();
            const projectRepository = new MockProjectRepository();

            updateSpy = sinon.spy(featureRepository, 'update');

            sinon.stub(featureRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'feature-2') {
                    return Promise.resolve(new Feature('feature-2', 'feature2', null, [], null));
                } else {
                    return Promise.resolve(null);
                }
            });

            featureService = new FeatureService(featureRepository, projectRepository);
        });

        it('should return false given feature key does not exist', () => {

            return co(function*() {
                const result: boolean = yield featureService.assignGroups('feature-1', [
                    'group-1', 'group-2',
                ]);

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return false given null group key', () => {

            return co(function*() {
                const result: boolean = yield featureService.assignGroups('feature-2', [
                    null,
                ]);

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return true given feature key does exist', () => {

            return co(function*() {
                const result: boolean = yield featureService.assignGroups('feature-2', [
                    'group-1', 'group-2',
                ]);

                expect(result).to.be.true;
                sinon.assert.calledOnce(updateSpy);

                const feature: Feature = updateSpy.args[0][0];

                expect(feature.groups.length).to.be.eq(2);
            });
        });
    });

    describe('deassignGroups', () => {

        let updateSpy: sinon.SinonSpy = null;
        let featureService: FeatureService = null;

        beforeEach(() => {
            const featureRepository = new MockFeatureRepository();
            const projectRepository = new MockProjectRepository();

            updateSpy = sinon.spy(featureRepository, 'update');

            sinon.stub(featureRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'feature-2') {
                    return Promise.resolve(new Feature('feature-2', 'feature2', null, [new FeatureGroup('group-1', null), new FeatureGroup('group-2', null)], null));
                } else {
                    return Promise.resolve(null);
                }
            });

            featureService = new FeatureService(featureRepository, projectRepository);
        });

        it('should return false given feature key does not exist', () => {

            return co(function*() {
                const result: boolean = yield featureService.deassignGroups('feature-1', [
                    'group-1',
                ]);

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return false given null group key', () => {

            return co(function*() {
                const result: boolean = yield featureService.assignGroups('feature-2', [
                    null,
                ]);

                expect(result).to.be.false;
                sinon.assert.notCalled(updateSpy);
            });
        });

        it('should return true given feature key does exist', () => {

            return co(function*() {
                const result: boolean = yield featureService.deassignGroups('feature-2', [
                    'group-1',
                ]);

                expect(result).to.be.true;
                sinon.assert.calledOnce(updateSpy);

                const feature: Feature = updateSpy.args[0][0];

                expect(feature.groups.length).to.be.eq(1);
            });
        });
    });

});
