// Imports interfaces
import { IProjectRepository } from './../project';

// Imports models
import { Project } from './../../models/project';

export class MockProjectRepository implements IProjectRepository {
    public list(): Promise<Project[]> {
        return null;
    }

    public create(id: string, name: string, key:string): Promise<Project> {
        return null;
    }

    public update(name: string, key:string): Promise<Project> {
        return null;
    }
}
