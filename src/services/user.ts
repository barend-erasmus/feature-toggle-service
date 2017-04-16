// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IUserRepository } from './../repositories/user';

// Imports models
import { User } from './../models/user';
import { UserGroup } from './../models/user-group';

export class UserService {

    constructor(private userRepository: IUserRepository) {

    }

    public list(projectId: string): Promise<User[]> {
        return this.userRepository.listByProjectId(projectId);
    }

    public createUserGroup(name: string, key: string): Promise<UserGroup> {

        const self = this;
        const id = uuid.v4();

        return co(function*() {
            const findByKeyResult: UserGroup = yield self.userRepository.findUserGroupByKey(key);

            if (findByKeyResult !== null) {
                return null;
            }

            const createResult: boolean = yield self.userRepository.createUserGroup(id, name, key);
            return new UserGroup(id, name, key);
        });
    }
}
