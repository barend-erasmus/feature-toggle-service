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

describe('/api/project', () => {

    describe('GET /list', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/project/list')
                .expect(200, done);
        });
    });

    describe('POST /create', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/project/create')
                .send({
                    key: 'project-1',
                    name: 'Project1',
                })
                .expect(200, done);
        });
    });
});


describe('/api/feature', () => {

    describe('GET /list', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .get('/api/feature/list?projectKey=project-1')
                .expect(200, done);
        });
    });

    describe('POST /create', () => {

        let featureToggleApi: FeatureToggleApi = null;

        beforeEach(() => {
            featureToggleApi = new FeatureToggleApi(express(), 3000);
        });

        it('should return with status code 200', (done: () => void) => {
            request(featureToggleApi.getApp())
                .post('/api/feature/create')
                .send({
                    key: 'feature-1',
                    name: 'Feature1',
                    type: 'normal',
                    projectKey: 'project-1'
                })
                .expect(200, done);
        });
    });
});
