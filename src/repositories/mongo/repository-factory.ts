// Imports
import * as yargs from 'yargs';

// Imports interfaces
import { IFeatureRepository } from './../feature';
import { IGroupRepository } from './../group';
import { IProjectRepository } from './../project';

// Imports repositories
import { FeatureRepository } from './feature';
import { GroupRepository } from './group';
import { ProjectRepository } from './project';

const argv = yargs.argv;

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new ProjectRepository(argv.prod ? 'mongodb://localhost:27017/feature-toggle-service' : 'mongodb://localhost:27017/feature-toggle-service');
    }

    public getInstanceOfFeatureRepository(config: any): IFeatureRepository {
        return new FeatureRepository(argv.prod ? 'mongodb://localhost:27017/feature-toggle-service' : 'mongodb://localhost:27017/feature-toggle-service');
    }

    public getInstanceOfGroupRepository(config: any): IGroupRepository {
        return new GroupRepository(argv.prod ? 'mongodb://localhost:27017/feature-toggle-service' : 'mongodb://localhost:27017/feature-toggle-service');
    }
}
