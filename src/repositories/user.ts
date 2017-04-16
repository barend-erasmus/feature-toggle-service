// Imports models
import { User } from './../models/user';
import { UserGroup } from './../models/user-group';

export interface IUserRepository {
    listByProjectId(projectId: string): Promise<User[]>;
    createUserGroup(id: string, name: string, key: string): Promise<boolean>;
    findUserGroupByKey(key: string): Promise<UserGroup>;
}
