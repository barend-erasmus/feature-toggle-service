// Imports interfaces
import { IConsumerRepository } from './../consumer';

// Imports models
import { Consumer } from './../../models/consumer';
import { Group } from './../../models/group';

export class ConsumerRepository implements IConsumerRepository {

    constructor() {

    }

    public listByProjectKey(key: string): Promise<Consumer[]> {
        return Promise.resolve([
            new Consumer('1', 'User1', null),
        ]);
    }
}
