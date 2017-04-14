// Imports interfaces
import { IProjectRepository } from './../project';

// Imports models
import { Project } from './../../models/project';

export class MockProjectRepository implements IProjectRepository {
    public list(): Promise<Project[]> {
        return null;
    }

    public create(id: string, name: string, key: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    public update(id: string, name: string, key: string): Promise<boolean> {
        return null;
    }

    public findByKey(key: string): Promise<Project> {
        return null;
    }
}
