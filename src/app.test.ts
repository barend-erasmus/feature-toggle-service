// Imports
import { expect } from 'chai';
import 'mocha';
import * as request from 'supertest';
import express = require("express");

// Imports app
import { FeatureToggleApi } from './app';

// Imports factories
import { RepositoryFactory } from './repositories/mongo/repository-factory';

FeatureToggleApi.repositoryFactory = new RepositoryFactory();

describe('/api/projects', () => {

    describe('GET /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/projects')
                .expect(200, done);
        });
    });

    describe('POST /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/projects')
                .send({
                    key: 'project-1',
                    name: 'Project1',
                })
                .expect(200, done);
        });
    });
});

describe('/api/groups', () => {

    describe('GET /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/groups')
                .expect(200, done);
        });
    });

    describe('POST /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/groups')
                .send({
                    key: 'group-1',
                    name: 'Group1',
                })
                .expect(200, done);
        });
    });
});

describe('/api/features', () => {

    describe('GET /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/features?projectKey=project-1')
                .expect(200, done);
        });
    });

    describe('GET /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/features?key=feature-1')
                .expect(200, done);
        });
    });

    describe('POST /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/features')
                .send({
                    key: 'feature-1',
                    name: 'Feature1',
                    projectKey: 'project-1',
                    type: 'normal',
                })
                .expect(200, done);
        });
    });

    describe('PUT /toggle', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .put('/api/features/toggle')
                .send({
                    key: 'feature-1',
                })
                .expect(200, done);
        });
    });

    describe('PUT /groups', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/features/groups')
                .send({
                    groupKeys: [
                        'group-1',
                    ],
                    key: 'feature-1',
                })
                .expect(200, done);
        });
    });

    describe('DELETE /groups', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .delete('/api/features/groups')
                .send({
                    groupKeys: [
                        'group-1',
                    ],
                    key: 'feature-1',
                })
                .expect(200, done);
        });
    });
});

