// Imports interfaces
import { IFeatureRepository } from './../feature';
import { IProjectRepository } from './../project';
import { IGroupRepository } from './../group';

// Imports repositories
import { MockFeatureRepository } from './feature';
import { MockProjectRepository } from './project';
import { MockGroupRepository } from './group';

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
