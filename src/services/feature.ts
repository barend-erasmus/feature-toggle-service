// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IFeatureRepository } from './../repositories/feature';

// Imports models
import { Feature } from './../models/feature';
import { AssociatedProject } from './../models/associated-project';

export class FeatureService {

    constructor(private featureRepository: IFeatureRepository) {

    }

    public list(projectKey: string): Promise<Feature[]> {
        return this.featureRepository.listByProjectKey(projectKey);
    }

    public create(name: string, key: string, type: string, projectKey: string): Promise<Feature> {
        const self = this;

        return co(function*() {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (feature !== null) {
                return null;
            }

            const newFeature: Feature = new Feature(key, name, type, [], new AssociatedProject(projectKey, null));

            const success: boolean = yield self.featureRepository.create(newFeature);

            return newFeature;
        }).catch((err: Error) => {
            console.log(err.stack);
        })
    }

    public assignUsers(featureId: string, listOfUserId: string[]): Promise<boolean> {
        return null;
    }

    public assignUserGroup(featureId: string, userGroupId: string): Promise<boolean> {
        return null;
    }
}
