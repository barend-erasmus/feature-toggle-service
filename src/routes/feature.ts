// Imports
import * as co from 'co';
import { Express, Request, Response } from "express";
import * as express from 'express';

// Imports app
import { FeatureToggleApi } from './../app';

// Imports configuration
import { config } from './../config';

// Imports interfaces
import { IRepositoryFactory } from './../repositories/repository-factory';

// Imports services
import { FeatureService } from './../services/feature';

// Imports models
import { Feature } from './../models/feature';

export class FeatureRouter {

    private router = express.Router();

    constructor() {
        this.router.get('/list', this.list);
        this.router.post('/create', this.create);
        this.router.put('/toggle', this.toggle);
        this.router.get('/find', this.find);
        this.router.put('/assignGroups', this.assignGroups);
        this.router.put('/deassignGroups', this.deassignGroups);
    }

    public GetRouter() {
        return this.router;
    }

    private list(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const featureService = new FeatureService(featureRepository);

            const features: Feature[] = yield featureService.list(req.query.projectKey);

            res.send(features);
        });
    }

    private find(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const featureService = new FeatureService(featureRepository);

            const feature: Feature = yield featureService.find(req.query.key);

            res.send(feature);
        });
    }

    private create(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const featureService = new FeatureService(featureRepository);

            const feature: Feature = yield featureService.create(req.body.name, req.body.key, req.body.type, req.body.projectKey);

            res.send(feature);
        });
    }

     private toggle(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const featureService = new FeatureService(featureRepository);

            const feature: Feature = yield featureService.toggle(req.body.key);

            res.send(feature);
        });
    }

    private assignGroups(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const featureService = new FeatureService(featureRepository);

            const success: boolean = yield featureService.assignGroups(req.body.key, req.body.groupKeys);

            res.send(success);
        });
    }

    private deassignGroups(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const featureService = new FeatureService(featureRepository);

            const success: boolean = yield featureService.deassignGroups(req.body.key, req.body.groupKeys);

            res.send(success);
        });
    }

}
