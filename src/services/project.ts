// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IProjectRepository } from './../repositories/project';

// Imports models
import { Project } from './../models/project';

export class ProjectService {

    constructor(private projectRepository: IProjectRepository) {

    }

    public create(name: string, key: string): Promise<Project> {
        const self = this;
    
        return co(function*() {
            const id = uuid.v4();
            
            const findByKeyResult: Project = yield self.projectRepository.findByKey(key);

            if (findByKeyResult !== null) {
                return null;
            }

            let project: Project = new Project(key, name);

            const createResult: boolean = yield self.projectRepository.create(project);
            return project;
        });
    }

    public list(): Promise<Project[]> {
        return this.projectRepository.list();
    }
}
