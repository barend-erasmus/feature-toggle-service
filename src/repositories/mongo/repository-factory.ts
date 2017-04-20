// Imports interfaces
import { IFeatureRepository } from './../feature';
import { IProjectRepository } from './../project';

// Imports repositories
import { FeatureRepository } from './feature';
import { ProjectRepository } from './project';

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new ProjectRepository('mongodb://localhost:27017/myproject');
    }

    public getInstanceOfFeatureRepository(config: any): IFeatureRepository {
        return new FeatureRepository('mongodb://localhost:27017/myproject');
    }
}
