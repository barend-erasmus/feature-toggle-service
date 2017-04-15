// Imports models
import { Feature } from './../models/feature';

export interface IFeatureRepository {
    listByProjectId(projectId: string): Promise<Feature[]>;
}
