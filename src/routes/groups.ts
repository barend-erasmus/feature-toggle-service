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
import { GroupService } from './../services/group';

// Imports models
import { Group } from './../models/group';

export class GroupsRouter {

    private router = express.Router();

    constructor() {
        this.router.get('/', (req, res, next) => {

            if (req.query.key !== undefined) {

                return this.find(req, res, next);

            } else {
                return this.list(req, res, next);
            }
        });
        this.router.post('/', this.create);
        this.router.post('/consumers', this.assignConsumers);
        this.router.delete('/consumers', this.deassignConsumers);
    }

    public GetRouter() {
        return this.router;
    }

    private find(req: Request, res: Response, next: () => void) {
        co(function*() {
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const groupService = new GroupService(groupRepository);

            const group: Group = yield groupService.find(req.query.key);

            res.send(group);
        });
    }

    private list(req: Request, res: Response, next: () => void) {
        co(function*() {
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const groupService = new GroupService(groupRepository);

            const groups: Group[] = yield groupService.list();

            if (groups === null) {
                res.status(400).end();
                return;
            }

            res.send(groups);
        });
    }

    private create(req: Request, res: Response, next: () => void) {
        co(function*() {
            const groupRepository = FeatureToggleApi.repositoryFactory.getInstanceOfGroupRepository(null);
            const groupService = new GroupService(groupRepository);

            const group: Group = yield groupService.create(req.body.name, req.body.key);

            if (group === null) {
                res.status(400).end();
                return;
            }

            res.send(group);
        });
    }

    private assignConsumers(req: Request, res: Response, next: () => void) {
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
        });
    }

    private deassignConsumers(req: Request, res: Response, next: () => void) {
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
        });
    }

}
