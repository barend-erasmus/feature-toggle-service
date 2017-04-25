// Imports interfaces
import { IFeatureRepository } from './feature';
import { IGroupRepository } from './group';
import { IProjectRepository } from './project';

export interface IRepositoryFactory {

    getInstanceOfProjectRepository(config: any): IProjectRepository;
    getInstanceOfFeatureRepository(config: any): IFeatureRepository;
    getInstanceOfGroupRepository(config: any): IGroupRepository;
}
