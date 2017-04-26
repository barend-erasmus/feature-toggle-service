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
import { ProjectService } from './../services/project';

// Imports models
import { Project } from './../models/project';

export class ProjectsRouter {

    private router = express.Router();

    constructor() {
        this.router.get('/', this.list);
        this.router.post('/', this.create);
    }

    public GetRouter() {
        return this.router;
    }

    private list(req: Request, res: Response, next: () => void) {
        co(function*() {
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const projectService = new ProjectService(projectRepository);

            const projects: Project[] = yield projectService.list();

            res.send(projects);
        });
    }

    private create(req: Request, res: Response, next: () => void) {
         co(function*() {
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const projectService = new ProjectService(projectRepository);

            const project: Project = yield projectService.create(req.body.name, req.body.key);

            res.send(project);
        });
    }

}
