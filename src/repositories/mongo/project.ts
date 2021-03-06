// Imports
import * as co from 'co';
import * as mongo from 'mongodb';

// Imports interfaces
import { IProjectRepository } from './../project';

// Imports models
import { Project } from './../../models/project';

// Imports Dto
import { ProjectDto } from './../dto/project';

export class ProjectRepository implements IProjectRepository {

    constructor(private uri: string) {

    }

    public list(): Promise<Project[]> {
        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('projects');

            const projects: ProjectDto[] = yield collection.find({}).toArray();

            db.close();

            return projects.map((x) => new Project(x.key, x.name, x.createdTimestamp));
        });
    }

    public create(project: Project): Promise<boolean> {
        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('projects');

            const result: any = yield collection.insertOne(new ProjectDto(project.key, project.name, project.createdTimestamp));

            db.close();

            return true;
        });
    }

    public update(project: Project): Promise<boolean> {
        throw new Error('Not Implemented Yet!');
    }

    public findByKey(key: string): Promise<Project> {
        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('projects');

            const project: ProjectDto = yield collection.findOne({
                key,
            });

            db.close();

            if (!project) {
                return null;
            }

            return new Project(project.key, project.name, project.createdTimestamp);
        });
    }
}
