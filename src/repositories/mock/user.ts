// Imports interfaces
import { IUserRepository } from './../user';

// Imports models
import { User } from './../../models/user';
import { UserGroup } from './../../models/user-group';

export class MockUserRepository implements IUserRepository {
    public listByProjectId(projectId: string): Promise<User[]> {
        return null;
    }

    public createUserGroup(id: string, name: string, key: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    public findUserGroupByKey(key: string): Promise<UserGroup> {
        return null;
    }
}
