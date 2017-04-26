// Imports interfaces
import { IConsumerRepository } from './../consumer';

// Imports models
import { Consumer } from './../../models/consumer';
import { Group } from './../../models/group';

export class MockConsumerRepository implements IConsumerRepository {

    public listByProjectKey(key: string): Promise<Consumer[]> {
        return Promise.resolve([]);
    }
}
