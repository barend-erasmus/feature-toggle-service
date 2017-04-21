// Imports models
import { Feature } from './../models/feature';

export interface IFeatureRepository {
    listByProjectKey(key: string): Promise<Feature[]>;

    findByKey(key: string): Promise<Feature>;

    create(feature: Feature): Promise<boolean>;

    update(feature: Feature): Promise<boolean>;
}
