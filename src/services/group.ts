// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IGroupRepository } from './../repositories/group';

// Imports models
import { Consumer } from './../models/consumer';
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

            const newGroup: Group = new Group(key, name, [], new Date().getTime());

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

    public assignConsumers(key: string, consumerIds: string[], type: string): Promise<boolean> {
        const self = this;

        return co(function*(){

            const group: Group = yield self.groupRepository.findByKey(key);

            if (group === null) {
                return false;
            }

            for (const i of consumerIds) {
                const consumer: Consumer = new Consumer(i, null, type);

                if (!consumer.isValid()) {
                    return false;
                }

                group.assignConsumer(consumer);
            }

            const success: boolean = yield self.groupRepository.update(group);

            return true;
        });
    }

    public deassignConsumers(key: string, consumerIds: string[], type: string): Promise<boolean> {
        const self = this;

        return co(function*(){

            const group: Group = yield self.groupRepository.findByKey(key);

            if (group === null) {
                return false;
            }

            for (const i of consumerIds) {
                const consumer: Consumer = new Consumer(i, null, type);

                if (!consumer.isValid()) {
                    return false;
                }

                group.deassignConsumer(consumer);
            }

            const success: boolean = yield self.groupRepository.update(group);

            return true;
        });
    }
}
