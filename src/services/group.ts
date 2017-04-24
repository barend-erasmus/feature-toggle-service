// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IGroupRepository } from './../repositories/group';

// Imports models
import { Group } from './../models/group';

export class GroupService {

    constructor(private groupRepository: IGroupRepository) {

    }

    public create(name: string, key: string): Promise<Group> {

        const self = this;

        return co(function*() {
            const id = uuid.v4();

            const group: Group = yield self.groupRepository.findByKey(key);

            if (group !== null) {
                return null;
            }

            const newGroup: Group = new Group(key, name, []);

            if (!newGroup.isValid()) {
                return null;
            }

            const success: boolean = yield self.groupRepository.create(newGroup);

            return newGroup;
        });
    }

    public list(): Promise<Group[]> {
        return this.groupRepository.list();
    }
}
