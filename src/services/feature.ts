// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IFeatureRepository } from './../repositories/feature';

// Imports models
import { Feature } from './../models/feature';

export class FeatureService {

    constructor(private featureRepository: IFeatureRepository) {

    }

    public list(projectKey: string): Promise<Feature[]> {
        return this.featureRepository.listByProjectKey(projectKey);
    }

    public create(name: string, key: string): Promise<Feature> {
        const self = this;

        return co(function*() {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (feature !== null) {
                return null;
            }

            const newFeature: Feature = new Feature(key, name, null, null, null);

            const success: boolean = yield self.featureRepository.create(newFeature);
            
            return newFeature;
        });
    }

    public assignUsers(featureId: string, listOfUserId: string[]): Promise<boolean> {
        return null;
    }

    public assignUserGroup(featureId: string, userGroupId: string): Promise<boolean> {
        return null;
    }
}
