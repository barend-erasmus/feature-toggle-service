// Imports
import * as co from 'co';
import * as mongo from 'mongodb';

// Imports interfaces
import { IProjectRepository } from './../project';

// Imports models
import { Project } from './../../models/project';

export class ProjectRepository implements IProjectRepository {

    constructor(private uri: string) {

    }

    public list(): Promise<Project[]> {
        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('projects');

            const projects: any[] = yield collection.find({}).toArray();

            db.close();

            return projects.map((x) => new Project(x.key, x.name));
        });
    }

    public create(project: Project): Promise<boolean> {
        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('projects');

            const result: any = yield collection.insertOne(project);

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

            const project: Project = yield collection.findOne({
                key
      ,      });

            db.close();

            if (project === null) {
                return null;
            }

            return new Project(project.key, project.name);
        });
    }
}
