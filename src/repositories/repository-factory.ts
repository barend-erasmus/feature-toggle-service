// Imports interfaces
import { IProjectRepository } from './project';

export interface IRepositoryFactory {

    getInstanceOfProjectRepository(config: any): IProjectRepository;
}