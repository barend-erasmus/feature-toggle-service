// Imports interfaces
import { IUserRepository } from './../user';

// Imports models
import { User } from './../../models/user';

export class MockUserRepository implements IUserRepository {
    public listByProjectId(projectId: string): Promise<User[]> {
        return null;
    }
}
