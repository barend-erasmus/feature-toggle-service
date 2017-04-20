// Imports interfaces
import { IFeatureRepository } from './feature';
import { IProjectRepository } from './project';

export interface IRepositoryFactory {

    getInstanceOfProjectRepository(config: any): IProjectRepository;
    getInstanceOfFeatureRepository(config: any): IFeatureRepository;
}
