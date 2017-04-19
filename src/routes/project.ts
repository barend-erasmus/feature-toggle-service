// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as co from 'co';

// Imports app
import { FeatureToggleApi } from './../app';

// Imports configuration
import { config } from './../config';

// Imports interfaces
import { IRepositoryFactory } from './../repositories/repository-factory';

// Imports services
import { ProjectService } from './../services/project';

// Imports models
import { Project } from './../models/project';

export class ProjectRouter {

    private router = express.Router();

    constructor() {
        this.router.get('/list', this.list);
        this.router.post('/create', this.create);
    }

    public GetRouter() {
        return this.router;
    }

    private list(req: Request, res: Response, next: () => void) {
        co(function* () {
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const projectService = new ProjectService(projectRepository);

            let result: Project[] = yield projectService.list();

            res.send(result);
        });
    }

    private create(req: Request, res: Response, next: () => void) {
        co(function* () {
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const projectService = new ProjectService(projectRepository);

            let result: Project = yield projectService.create(req.body.name, req.body.key);

            res.send(result);
        });
    }

}