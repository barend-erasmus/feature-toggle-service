// Imports models
import { Feature } from './../models/feature';

export interface IFeatureRepository {
    listByProjectId(projectId: string): Promise<Feature[]>;

    findByKey(key: string): Promise<Feature>;

    create(id: string, name: string, key: string): Promise<boolean>;
}
