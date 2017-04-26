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

export class FeaturesRouter {

    private router = express.Router();

    constructor() {
        this.router.get('/', (req, res, next) => {
            if (req.query.id === undefined) {
                return this.list(req, res, next);
            } else {
                return this.find(req, res, next);
            }
        });

        this.router.post('/', this.create);
        this.router.put('/toggle', this.toggle);
        this.router.post('/groups', this.assignGroups);
        this.router.delete('/groups', this.deassignGroups);
        this.router.get('/status', this.status);
    }

    public GetRouter() {
        return this.router;
    }

    private status(req: Request, res: Response, next: () => void) {
        co(function* () {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const features: Feature[] = yield featureService.status(req.query.key, req.query.consumerId);

            res.send(features);
        });
    }

    private list(req: Request, res: Response, next: () => void) {
        co(function* () {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const features: Feature[] = yield featureService.list(req.query.projectKey);

            res.send(features);
        });
    }

    private find(req: Request, res: Response, next: () => void) {
        co(function* () {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const feature: Feature = yield featureService.find(req.query.key);

            res.send(feature);
        });
    }

    private create(req: Request, res: Response, next: () => void) {
        co(function* () {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const feature: Feature = yield featureService.create(req.body.name, req.body.key, req.body.type, req.body.projectKey);

            res.send(feature);
        });
    }

    private toggle(req: Request, res: Response, next: () => void) {
        co(function* () {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const feature: Feature = yield featureService.toggle(req.body.key);

            res.send(feature);
        });
    }

    private assignGroups(req: Request, res: Response, next: () => void) {
        co(function* () {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            if (typeof req.body.groupKeys === 'string') {
                req.body.groupKeys = [req.body.groupKeys];
            }

            const success: boolean = yield featureService.assignGroups(req.body.key, req.body.groupKeys);

            res.send(success);
        });
    }

    private deassignGroups(req: Request, res: Response, next: () => void) {
        co(function* () {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            if (typeof req.body.groupKeys === 'string') {
                req.body.groupKeys = [req.body.groupKeys];
            }

            const success: boolean = yield featureService.deassignGroups(req.body.key, req.body.groupKeys);

            res.send(success);
        });
    }

}