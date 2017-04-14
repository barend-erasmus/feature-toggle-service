// Imports models
import { User } from './../models/user';

export interface IUserRepository {
    listByProjectId(projectId: string): Promise<User[]>;
}
