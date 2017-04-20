// Imports interfaces
import { IProjectRepository } from './../project';
import { IFeatureRepository } from './../feature';

// Imports repositories
import { MockProjectRepository } from './project';
import { MockFeatureRepository } from './feature';

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new MockProjectRepository();
    }

    public getInstanceOfFeatureRepository(config: any): IFeatureRepository {
        return new MockFeatureRepository();
    }
}
