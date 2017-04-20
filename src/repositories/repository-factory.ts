// Imports interfaces
import { IProjectRepository } from './project';
import { IFeatureRepository } from './feature';

export interface IRepositoryFactory {

    getInstanceOfProjectRepository(config: any): IProjectRepository;
    getInstanceOfFeatureRepository(config: any): IFeatureRepository;
}
