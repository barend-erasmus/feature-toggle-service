// Imports interfaces
import { IUserRepository } from './../repositories/user';

// Imports models
import { User } from './../models/user';

export class UserService {

    constructor(private userRepository: IUserRepository) {

    }

    public list(projectId: string): Promise<User[]> {
        return this.userRepository.listByProjectId(projectId);
    }
}
