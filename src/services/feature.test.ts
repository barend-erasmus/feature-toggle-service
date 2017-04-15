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

});
