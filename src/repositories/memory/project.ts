// Imports
import * as co from 'co';
import { DataStore } from './data-store';

// Imports interfaces
import { IProjectRepository } from './../project';

// Imports models
import { Project } from './../../models/project';

// Imports Dto
import { ProjectDto } from './../dto/project';

export class ProjectRepository implements IProjectRepository {

    constructor() {

    }

    public list(): Promise<Project[]> {
        const self = this;

        return co(function*() {
            const projects: ProjectDto[] = DataStore.projects;

            return projects.map((x) => new Project(x.key, x.name, x.createdTimestamp));
        });
    }

    public create(project: Project): Promise<boolean> {
        const self = this;

        return co(function*() {
            DataStore.projects.push(new ProjectDto(project.key, project.name, project.createdTimestamp));

            return true;
        });
    }

    public update(project: Project): Promise<boolean> {
        throw new Error('Not Implemented Yet!');
    }

    public findByKey(key: string): Promise<Project> {
        const self = this;

        return co(function*() {
            const project: ProjectDto = DataStore.projects.find((project) => project.key === project.key);

            if (!project) {
                return null;
            }

            return new Project(project.key, project.name, project.createdTimestamp);
        });
    }
}
