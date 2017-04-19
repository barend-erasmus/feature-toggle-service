// Imports interfaces
import { IProjectRepository } from './../project';

// Imports repositories
import { MockProjectRepository } from './project';

export class RepositoryFactory {

    public getInstanceOfProjectRepository(config: any): IProjectRepository {
        return new MockProjectRepository();
    }
}
