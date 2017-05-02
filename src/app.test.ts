// Imports
import { expect } from 'chai';
import 'mocha';
import * as request from 'supertest';
import express = require("express");

// Imports app
import { FeatureToggleApi } from './app';

// Imports factories
import { RepositoryFactory } from './repositories/mock/repository-factory';

FeatureToggleApi.repositoryFactory = new RepositoryFactory();

describe('/api/projects', () => {

    describe('GET /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/projects')
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });

    describe('POST /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/projects')
                .send({
                    key: 'project-1',
                    name: 'Project1',
                })
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });
});

describe('/api/groups', () => {

    describe('GET /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/groups')
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });

    describe('POST /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/groups')
                .send({
                    key: 'group-1',
                    name: 'Group1',
                })
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });
});

describe('/api/features', () => {

    describe('GET /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/features?projectKey=project-1')
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });

    describe('GET /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/features?key=feature-1')
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });

    describe('POST /', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/features')
                .send({
                    key: 'feature-1',
                    name: 'Feature1',
                    projectKey: 'project-1',
                    type: 'normal',
                })
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });

    describe('PUT /toggle', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .put('/api/features/toggle')
                .send({
                    key: 'feature-1',
                })
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });

    describe('PUT /groups', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/features/groups')
                .send({
                    groupKeys: [
                        'group-1',
                    ],
                    key: 'feature-1',
                })
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });

    describe('DELETE /groups', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return', (done: () => void) => {
            request(featureToggleApi.getApp())
                .delete('/api/features/groups')
                .send({
                    groupKeys: [
                        'group-1',
                    ],
                    key: 'feature-1',
                })
                .end((err, res) => {
                    if (err) throw err;

                    expect(res.status).to.be.not.eq(404);
                    expect(res.status).to.be.not.eq(500);

                    done();
                });
        });
    });
});

