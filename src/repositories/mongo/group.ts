// Imports
import * as co from 'co';
import * as mongo from 'mongodb';

// Imports interfaces
import { IGroupRepository } from './../group';

// Imports models
import { Group } from './../../models/group';
import { Consumer } from './../../models/consumer';

// Imports Dto
import { GroupDto } from './../dto/group';

export class GroupRepository implements IGroupRepository {

    constructor(private uri: string) {

    }

    public list(): Promise<Group[]> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const groups: GroupDto[] = yield collection.find({}).toArray();

            db.close();

            return groups.map((x) => new Group(x.key, x.name, x.consumerKeys.map((consumerKey) => new Consumer(consumerKey, null, null)), x.createdTimestamp));
        });
    }

    public create(group: Group): Promise<boolean> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const result: any = yield collection.insertOne(new GroupDto(
                group.key,
                group.name,
                group.consumers.map((consumer) => consumer.id),
                group.createdTimestamp
            ));

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
                        consumerKeys: group.consumers.map((consumer) => consumer.id),
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

            const group: GroupDto = yield collection.findOne({
                key,
            });

            db.close();

            if (!group) {
                return null;
            }

            return new Group(group.key, group.name, group.consumerKeys.map((consumerKey) => new Consumer(consumerKey, null, null)), group.createdTimestamp);
        });
    }
}
