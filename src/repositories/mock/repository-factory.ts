// Imports interfaces
import { IFeatureRepository } from './../feature';
import { IGroupRepository } from './../group';
import { IProjectRepository } from './../project';

// Imports repositories
import { MockFeatureRepository } from './feature';
import { MockGroupRepository } from './group';
import { MockProjectRepository } from './project';

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new MockProjectRepository();
    }

    public getInstanceOfFeatureRepository(config: any): IFeatureRepository {
        return new MockFeatureRepository();
    }

    public getInstanceOfGroupRepository(config: any): IGroupRepository {
        return new MockGroupRepository();
    }
}
