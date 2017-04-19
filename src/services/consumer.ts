// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IConsumerRepository } from './../repositories/consumer';

// Imports models
import { Consumer } from './../models/consumer';

export class ConsumerService {

    constructor(private consumerRepository: IConsumerRepository) {

    }

    public list(projectKey: string): Promise<Consumer[]> {
        return this.consumerRepository.listByProjectKey(projectKey);
    }
}
