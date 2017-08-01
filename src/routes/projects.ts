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
import { ProjectService } from './../services/project';

// Imports models
import { Project } from './../models/project';

export class ProjectsRouter {

    public static list(req: Request, res: Response, next: () => void) {
        co(function*() {
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const projectService = new ProjectService(projectRepository);

            const projects: Project[] = yield projectService.list();

            if (projects === null) {
                res.status(400).end();
                return;
            }

            res.send(projects);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

    public static create(req: Request, res: Response, next: () => void) {
         co(function*() {
            const projectRepository = FeatureToggleApi.repositoryFactory.getInstanceOfProjectRepository(null);
            const projectService = new ProjectService(projectRepository);

            const project: Project = yield projectService.create(req.body.name, req.body.key);

            if (project === null) {
                res.status(400).end();
                return;
            }

            res.send(project);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message,
            });
        });
    }

}
