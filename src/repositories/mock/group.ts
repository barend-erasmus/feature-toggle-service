// Imports interfaces
import { IGroupRepository } from './../group';

// Imports models
import { Group } from './../../models/group';

export class MockGroupRepository implements IGroupRepository {

    public list(): Promise<Group[]> {
       return Promise.resolve([]);
    }

    public create(group: Group): Promise<boolean> {
        return Promise.resolve(true);
    }

    public update(group: Group): Promise<boolean> {
        return Promise.resolve(true);
    }

    public findByKey(key: string): Promise<Group> {
        return Promise.resolve(new Group(null, null, [], null));
    }
}
