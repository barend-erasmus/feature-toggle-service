// Imports interfaces
import { IFeatureRepository } from './../feature';
import { IProjectRepository } from './../project';

// Imports repositories
import { MockFeatureRepository } from './feature';
import { MockProjectRepository } from './project';

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new MockProjectRepository();
    }

    public getInstanceOfFeatureRepository(config: any): IFeatureRepository {
        return new MockFeatureRepository();
    }
}
