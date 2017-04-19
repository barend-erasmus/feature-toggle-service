// Imports interfaces
import { IConsumerRepository } from './../consumer';

// Imports models
import { Consumer } from './../../models/consumer';
import { Group } from './../../models/group';

export class ConsumerRepository implements IConsumerRepository {

    constructor(private uri: string) {

    }

    public listByProjectKey(key: string): Promise<Consumer[]> {
        throw new Error('Not Implemented Yet!');
    }
}
