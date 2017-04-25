// Imports
import * as co from 'co';
import * as mongo from 'mongodb';

// Imports interfaces
import { IGroupRepository } from './../group';

// Imports models
import { Group } from './../../models/group';

export class GroupRepository implements IGroupRepository {

    constructor(private uri: string) {

    }

    public list(): Promise<Group[]> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const projects: any[] = yield collection.find({}).toArray();

            db.close();

            return projects.map((x) => new Group(x.key, x.name, x.consumers));
        });
    }

    public create(group: Group): Promise<boolean> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const result: any = yield collection.insertOne({
                key: group.key,
                name: group.name,
                consumers: group.consumers
            });

            db.close();

            return true;
        });
    }

    public update(group: Group): Promise<boolean> {

        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const result = yield collection.updateOne({
                key: group.key,
            }, {
                    $set: {
                        consumers: group.consumers
                    },
                });

            db.close();

            return true;
        });
    }

    public findByKey(key: string): Promise<Group> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const group: Group = yield collection.findOne({
                key,
            });

            db.close();

            if (group === null) {
                return null;
            }

            return new Group(group.key, group.name, group.consumers);
        });
    }
}
