// Imports
import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import * as sinon from 'sinon';

// Imports services
import { FeatureService } from './feature';

// Imports repositories
import { MockFeatureRepository } from './../repositories/mock/feature';

// Imports domain models
import { Feature } from './../models/feature';

describe('FeatureService', () => {

    describe('list', () => {

        let featureService: FeatureService = null;

        beforeEach(() => {
            const featureRepository = new MockFeatureRepository();

            sinon.stub(featureRepository, 'listByProjectId').callsFake((projectId: string) => {
                if (projectId === '1') {
                    return Promise.resolve([
                        new Feature('1', 'Feature1', 'feature-1'),
                    ]);
                }
            });

            featureService = new FeatureService(featureRepository);
        });

        it('should return list of features', () => {

            return co(function*() {
                const listResult: Feature[] = yield featureService.list('1');

                expect(listResult.length).to.be.eq(1);
            });
        });
    });

    describe('create', () => {

        let createSpy: sinon.SinonSpy = null;
        let featureService: FeatureService = null;

        beforeEach(() => {
            const featureRepository = new MockFeatureRepository();

            createSpy = sinon.spy(featureRepository, 'create');

            sinon.stub(featureRepository, 'findByKey').callsFake((key: string) => {
                if (key === 'feature-2') {
                    return Promise.resolve(new Feature('2', 'feature2', 'feature-2'));
                }else {
                    return Promise.resolve(null);
                }
            });

            featureService = new FeatureService(featureRepository);
        });

        it('should return feature given feature key does not exist', () => {

            return co(function*() {
                const createResult: Feature = yield featureService.create('feature1', 'feature-1');

                expect(createResult).to.be.not.null;
                sinon.assert.calledOnce(createSpy);
            });
        });

        it('should return null given feature key does exist', () => {

            return co(function*() {
                const createResult: Feature = yield featureService.create('feature2', 'feature-2');

                expect(createResult).to.be.null;
                sinon.assert.notCalled(createSpy);
            });
        });
    });

});
