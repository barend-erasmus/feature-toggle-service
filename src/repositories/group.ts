// Imports models
import { Group } from './../models/group';

export interface IGroupRepository {

    list(): Promise<Group[]>;

    create(group: Group): Promise<boolean>;

    update(group: Group): Promise<boolean>;

    findByKey(key: string): Promise<Group>;
}
