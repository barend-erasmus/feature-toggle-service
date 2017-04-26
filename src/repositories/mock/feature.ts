// Imports interfaces
import { IFeatureRepository } from './../feature';

// Imports models
import { Feature } from './../../models/feature';

export class MockFeatureRepository implements IFeatureRepository {

    public listByProjectKey(key: string): Promise<Feature[]> {
        return Promise.resolve([]);
    }

     public list(): Promise<Feature[]> {
        return Promise.resolve([]);
    }

    public findByKey(key: string): Promise<Feature> {
        return Promise.resolve(new Feature(null, null, null, [], null, null, []));
    }

    public create(feature: Feature): Promise<boolean> {
        return Promise.resolve(true);
    }

    public update(feature: Feature): Promise<boolean> {
        return Promise.resolve(true);
    }
}
