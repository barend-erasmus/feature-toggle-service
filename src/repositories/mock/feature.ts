// Imports interfaces
import { IFeatureRepository } from './../feature';

// Imports models
import { Feature } from './../../models/feature';

export class MockFeatureRepository implements IFeatureRepository {
    public listByProjectId(projectId: string): Promise<Feature[]> {
        return null;
    }

    public  create(id: string, name: string, key: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    public findByKey(key: string): Promise<Feature> {
        return null;
    }
}
