// Imports interfaces
import { IProjectRepository } from './../project';
import { IFeatureRepository } from './../feature';

// Imports repositories
import { ProjectRepository } from './project';
import { FeatureRepository } from './feature';

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new ProjectRepository('mongodb://localhost:27017/myproject');
    }

    public getInstanceOfFeatureRepository(config: any): IFeatureRepository {
        return new FeatureRepository('mongodb://localhost:27017/myproject');
    }
}
