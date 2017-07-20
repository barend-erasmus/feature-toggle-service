// Imports
import * as co from 'co';
import { Express, Request, Response } from "express";
import * as express from 'express';

// Imports app
import { FeatureToggleApi } from './../app';

// Import configurations
let config = require('./../config').config;

const argv = require('yargs').argv;

if (argv.prod) {
    config = require('./../config.prod').config;
}

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

            if (projects === null) {
                res.status(400).end();
                return;
            }

            res.send(projects);
        });
    }

    private create(req: Request, res: Response, next: () => void) {
         co(function*() {
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const projectService = new ProjectService(projectRepository);

            const project: Project = yield projectService.create(req.body.name, req.body.key);

            if (project === null) {
                res.status(400).end();
                return;
            }

            res.send(project);
        });
    }

}
