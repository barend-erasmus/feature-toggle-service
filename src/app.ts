// Imports
import express = require("express");
import * as yargs from 'yargs';
import { IRepositoryFactory } from './repositories/repository-factory';

// Imports middleware
import bodyParser = require('body-parser');
import * as cors from 'cors';
import jwt = require('express-jwt');
import expressWinston = require('express-winston');
import * as swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger.json';

// Imports routes
import { FeaturesRouter } from './routes/features';
import { GroupsRouter } from './routes/groups';
import { ProjectsRouter } from './routes/projects';

// Imports logger
import { logger } from './logger';

// Imports factories
import { RepositoryFactory } from './repositories/mongo/repository-factory';

const argv = yargs.argv;

export class FeatureToggleApi {

    public static repositoryFactory: IRepositoryFactory;

    constructor(private app: express.Express, private port: number) {

        this.configureMiddleware(app);
        this.configureRoutes(app);
        this.configureErrorHandling(app);
    }

    public getApp(): express.Application {
        return this.app;
    }

    public run() {
        this.app.listen(this.port);
    }

    private configureMiddleware(app: express.Express) {

        // Configure body-parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        // Configure CORS
        app.use(cors());

        // Configure express-jwt
        // app.use(jwt({
        //     audience: 'worldofrations.com',
        //     credentialsRequired: false,
        //     issuer: config.oauth.jwtIssuer,
        //     secret: config.oauth.jwtSecret,
        // }));

        // Configure express-winston
        app.use(expressWinston.logger({
            meta: false,
            msg: 'HTTP Request: {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
            winstonInstance: logger,
        }));

        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    private configureRoutes(app: express.Express) {

        app.get('/api/features', (req, res, next) => {

            if (req.query.projectKey !== undefined) {

                return FeaturesRouter.listByProjectKey(req, res, next);

            } else if (req.query.key !== undefined) {

                return FeaturesRouter.find(req, res, next);

            } else {
                return FeaturesRouter.list(req, res, next);
            }
        });

        app.post('/api/features', FeaturesRouter.create);
        app.put('/api/features/toggle', FeaturesRouter.toggle);
        app.post('/api/features/groups', FeaturesRouter.assignGroups);
        app.delete('/api/features/groups', FeaturesRouter.deassignGroups);
        app.post('/api/features/options', FeaturesRouter.addOptions);
        app.delete('/api/features/options', FeaturesRouter.removeOptions);
        app.get('/api/features/enabled', FeaturesRouter.enabled);

        app.get('/api/groups', (req, res, next) => {

            if (req.query.key !== undefined) {

                return GroupsRouter.find(req, res, next);

            } else {
                return GroupsRouter.list(req, res, next);
            }
        });
        app.post('/api/groups', GroupsRouter.create);
        app.post('/api/groups/consumers', GroupsRouter.assignConsumers);
        app.delete('/api/groups/consumers', GroupsRouter.deassignConsumers);

        app.get('/api/projects', ProjectsRouter.list);
        app.post('/api/projects', ProjectsRouter.create);
    }

    private configureErrorHandling(app: express.Express) {
        app.use((err: Error, req: express.Request, res: express.Response, next: () => void) => {
            logger.error(err.message);
            if (err.name === 'UnauthorizedError') {
                res.status(401).end();
            } else {
                res.status(500).send(err.message);
            }
        });
    }
}

FeatureToggleApi.repositoryFactory = new RepositoryFactory();
const api = new FeatureToggleApi(express(), argv.port || 3000);
api.run();
logger.info(`listening on ${argv.port || 3000}`);
