// Imports
import * as co from 'co';
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as yargs from 'yargs';

// Imports app
import { FeatureToggleApi } from './../app';

const argv = yargs.argv;

// Imports logger
import { logger } from './../logger';

// Imports interfaces
import { IRepositoryFactory } from './../repositories/repository-factory';

// Imports services
import { GroupService } from './../services/group';

// Imports models
import { Group } from './../models/group';

export class GroupsRouter {

    public static find(req: Request, res: Response, next: () => void) {
        co(function*() {
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const groupService = new GroupService(groupRepository);

            const group: Group = yield groupService.find(req.query.key);

            res.send(group);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static list(req: Request, res: Response, next: () => void) {
        co(function*() {
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const groupService = new GroupService(groupRepository);

            const groups: Group[] = yield groupService.list();

            if (groups === null) {
                res.status(400).end();
                return;
            }

            res.send(groups);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static create(req: Request, res: Response, next: () => void) {
        co(function*() {
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const groupService = new GroupService(groupRepository);

            const group: Group = yield groupService.create(req.body.name, req.body.key);

            if (group === null) {
                res.status(400).end();
                return;
            }

            res.send(group);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static assignConsumers(req: Request, res: Response, next: () => void) {
        co(function*() {
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const groupService = new GroupService(groupRepository);

            if (typeof req.body.consumerIds === 'string') {
                req.body.consumerIds = [req.body.consumerIds];
            }

            const success: boolean = yield groupService.assignConsumers(req.body.key, req.body.consumerIds, req.body.type);

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

    public static deassignConsumers(req: Request, res: Response, next: () => void) {
        co(function*() {
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const groupService = new GroupService(groupRepository);

            if (typeof req.body.consumerIds === 'string') {
                req.body.consumerIds = [req.body.consumerIds];
            }

            const success: boolean = yield groupService.deassignConsumers(req.body.key, req.body.consumerIds, req.body.type);

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
