// Imports models
import { Project } from './../models/project';

export interface IProjectRepository {

    list(): Promise<Project[]>;

    create(project: Project): Promise<boolean>;

    update(project: Project): Promise<boolean>;

    findByKey(key: string): Promise<Project>;
}
