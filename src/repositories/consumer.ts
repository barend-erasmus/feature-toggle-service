// Imports models
import { Consumer } from './../models/consumer';
import { Group } from './../models/group';

export interface IConsumerRepository {
    listByProjectKey(key: string): Promise<Consumer[]>;
}
