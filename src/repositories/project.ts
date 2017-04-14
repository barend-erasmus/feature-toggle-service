// Imports models
import { Project } from './../models/project';

export interface IProjectRepository {
    list(): Promise<Project[]>;
    create(id: string, name: string, key:string): Promise<Project>;
    update(name: string, key: string): Promise<Project>;
}
