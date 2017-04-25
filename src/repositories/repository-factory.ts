// Imports interfaces
import { IFeatureRepository } from './feature';
import { IProjectRepository } from './project';
import { IGroupRepository } from './group';

export interface IRepositoryFactory {

    getInstanceOfProjectRepository(config: any): IProjectRepository;
    getInstanceOfFeatureRepository(config: any): IFeatureRepository;
    getInstanceOfGroupRepository(config: any): IGroupRepository;
}
