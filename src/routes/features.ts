// Imports
import * as co from 'co';
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as yargs from 'yargs';

// Imports logger
import { logger } from './../logger';

// Imports app
import { FeatureToggleApi } from './../app';

const argv = yargs.argv;

// Imports interfaces
import { IRepositoryFactory } from './../repositories/repository-factory';

// Imports services
import { FeatureService } from './../services/feature';

// Imports models
import { Feature } from './../models/feature';

export class FeaturesRouter {

    public static enabled(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const result: boolean = yield featureService.enabled(req.query.key, req.query.consumerId, req.query.environmentKey, req.query.type);

            if (result === null) {
                res.status(400).end();
                return;
            }

            res.send(result);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static listByProjectKey(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const features: Feature[] = yield featureService.list(req.query.projectKey);

            if (features === null) {
                res.status(400).end();
                return;
            }

            res.send(features);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static list(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const features: Feature[] = yield featureService.list(null);

            if (features === null) {
                res.status(400).end();
                return;
            }

            res.send(features);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static find(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const feature: Feature = yield featureService.find(req.query.key);

            if (feature === null) {
                res.status(400).end();
                return;
            }

            res.send(feature);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static create(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const feature: Feature = yield featureService.create(req.body.name, req.body.key, req.body.type, req.body.projectKey);

            res.send(feature);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static toggle(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const feature: Feature = yield featureService.toggle(req.body.key);

            if (feature === null) {
                res.status(400).end();
                return;
            }

            res.send(feature);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static assignGroups(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            if (typeof req.body.groupKeys === 'string') {
                req.body.groupKeys = [req.body.groupKeys];
            }

            const success: boolean = yield featureService.assignGroups(req.body.key, req.body.environmentKey, req.body.groupKeys);

            if (success === null) {
                res.status(400).end();
                return;
            }

            res.send(success);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static deassignGroups(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            if (typeof req.body.groupKeys === 'string') {
                req.body.groupKeys = [req.body.groupKeys];
            }

            const success: boolean = yield featureService.deassignGroups(req.body.key, req.body.environmentKey, req.body.groupKeys);

            if (success === null) {
                res.status(400).end();
                return;
            }

            res.send(success);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static addOptions(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            const success: boolean = yield featureService.addOptions(req.body.key, req.body.environmentKey, req.body.options);

            if (success === null) {
                res.status(400).end();
                return;
            }

            res.send(success);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static removeOptions(req: Request, res: Response, next: () => void) {
        co(function*() {
            const featureRepository = FeatureToggleApi.repositoryFactory.getInstanceOfFeatureRepository(null);
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const featureService = new FeatureService(featureRepository, projectRepository, groupRepository);

            if (typeof req.body.optionKeys === 'string') {
                req.body.optionKeys = [req.body.optionKeys];
            }

            const success: boolean = yield featureService.removeOptions(req.body.key, req.body.environmentKey, req.body.optionKeys);

            if (success === null) {
                res.status(400).end();
                return;
            }

            res.send(success);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

}
