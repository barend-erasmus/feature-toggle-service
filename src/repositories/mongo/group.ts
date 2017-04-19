// Imports interfaces
import { IGroupRepository } from './../group';

// Imports models
import { Group } from './../../models/group';

export class GroupRepository implements IGroupRepository {

    constructor(private uri: string) {

    }

    public list(): Promise<Group[]> {
        throw new Error('Not Implemented Yet!');
    }

    public create(group: Group): Promise<boolean> {
        throw new Error('Not Implemented Yet!');
    }

    public update(group: Group): Promise<boolean> {
        throw new Error('Not Implemented Yet!');
    }

    public findByKey(key: string): Promise<Group> {
        throw new Error('Not Implemented Yet!');
    }
}
