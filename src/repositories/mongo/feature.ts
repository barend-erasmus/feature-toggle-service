// Imports interfaces
import { IFeatureRepository } from './../feature';

// Imports models
import { Feature } from './../../models/feature';

export class FeatureRepository implements IFeatureRepository {

    constructor(private uri: string) {

    }

    public listByProjectKey(key: string): Promise<Feature[]> {
        throw new Error('Not Implemented Yet!');
    }

    public findByKey(key: string): Promise<Feature> {
        throw new Error('Not Implemented Yet!');
    }

    public create(feature: Feature): Promise<boolean> {
        throw new Error('Not Implemented Yet!');
    }
}
