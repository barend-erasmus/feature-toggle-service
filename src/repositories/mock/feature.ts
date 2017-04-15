// Imports interfaces
import { IFeatureRepository } from './../feature';

// Imports models
import { Feature } from './../../models/feature';

export class MockFeatureRepository implements IFeatureRepository {
    public listByProjectId(projectId: string): Promise<Feature[]> {
        return null;
    }
}
