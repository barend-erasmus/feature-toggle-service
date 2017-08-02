// Imports
import * as co from 'co';
import { DataStore } from './data-store';

// Imports interfaces
import { IGroupRepository } from './../group';

// Imports models
import { Group } from './../../models/group';
import { Consumer } from './../../models/consumer';

// Imports Dto
import { GroupDto } from './../dto/group';

export class GroupRepository implements IGroupRepository {

    constructor() {

    }

    public list(): Promise<Group[]> {
        const self = this;

        return co(function* () {
            const groups: GroupDto[] = DataStore.groups;

            return groups.map((x) => new Group(x.key, x.name, x.consumerKeys.map((consumerKey) => new Consumer(consumerKey, null, null)), x.createdTimestamp));
        });
    }

    public create(group: Group): Promise<boolean> {
        const self = this;

        return co(function* () {
            DataStore.groups.push(new GroupDto(
                group.key,
                group.name,
                group.consumers.map((consumer) => consumer.id),
                group.createdTimestamp
            ));

            return true;
        });
    }

    public update(group: Group): Promise<boolean> {

        const self = this;

        return co(function* () {
            const existingGroup: GroupDto = DataStore.groups.find((group) => group.key === group.key);
            
            existingGroup.consumerKeys = group.consumers.map((consumer) => consumer.id);

            return true;
        });
    }

    public findByKey(key: string): Promise<Group> {
        const self = this;

        return co(function* () {
            const group: GroupDto = DataStore.groups.find((group) => group.key === key);

            if (!group) {
                return null;
            }

            return new Group(group.key, group.name, group.consumerKeys.map((consumerKey) => new Consumer(consumerKey, null, null)), group.createdTimestamp);
        });
    }
}
