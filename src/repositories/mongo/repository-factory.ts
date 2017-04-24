// Imports interfaces
import { IFeatureRepository } from './../feature';
import { IProjectRepository } from './../project';

// Imports repositories
import { FeatureRepository } from './feature';
import { ProjectRepository } from './project';

// Imports configuration
import { config as configuration } from './../../config';

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new ProjectRepository(configuration.db.uri);
    }

    public getInstanceOfFeatureRepository(config: any): IFeatureRepository {
        return new FeatureRepository(configuration.db.uri);
    }
}
