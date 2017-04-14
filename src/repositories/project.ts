// Imports models
import { Project } from './../models/project';

export interface IProjectRepository {

    list(): Promise<Project[]>;

    create(id: string, name: string, key: string): Promise<boolean>;

    update(id: string, name: string, key: string): Promise<boolean>;

    findByKey(key: string): Promise<Project>;
}
