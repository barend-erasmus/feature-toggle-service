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
            
            const findByKeyResult: Group = yield self.groupRepository.findByKey(key);

            if (findByKeyResult !== null) {
                return null;
            }
            
            let group: Group = new Group(key, name, null);

            const createResult: boolean = yield self.groupRepository.create(group);
            return group;
        });
    }
}
