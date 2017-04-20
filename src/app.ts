// Imports
import express = require("express");
import { IRepositoryFactory } from './repositories/repository-factory';

// Imports middleware
import bodyParser = require('body-parser');
import * as cors from 'cors';
import jwt = require('express-jwt');
import expressWinston = require('express-winston');

// Imports routes
import { FeatureRouter } from './routes/feature';
import { ProjectRouter } from './routes/project';

// Imports logger
import { logger } from './logger';

// Imports factories
import { RepositoryFactory } from './repositories/mongo/repository-factory';

// Imports configurations
import { config } from './config';

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
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/project", new ProjectRouter().GetRouter());
        app.use("/api/feature", new FeatureRouter().GetRouter());
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

const port = 8083;

FeatureToggleApi.repositoryFactory = new RepositoryFactory();
const api = new FeatureToggleApi(express(), port);
api.run();
logger.info(`Listening on ${port}`);
