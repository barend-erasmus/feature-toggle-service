// Imports interfaces
import { IProjectRepository } from './../project';

// Imports repositories
import { ProjectRepository } from './project';

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new ProjectRepository('mongodb://localhost:27017/myproject');
    }
}
