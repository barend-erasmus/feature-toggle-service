// Imports interfaces
import { IProjectRepository } from './../project';

// Imports models
import { Project } from './../../models/project';

export class MockProjectRepository implements IProjectRepository {
    
    public list(): Promise<Project[]> {
        return Promise.resolve([]);
    }

    public create(project: Project): Promise<boolean> {
        return Promise.resolve(true);
    }

    public update(project: Project): Promise<boolean> {
        return null;
    }

    public findByKey(key: string): Promise<Project> {
        return Promise.resolve(null);
    }
}
