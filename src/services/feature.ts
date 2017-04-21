// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IFeatureRepository } from './../repositories/feature';

// Imports models
import { AssociatedProject } from './../models/associated-project';
import { Feature } from './../models/feature';
import { FeatureGroup } from './../models/feature-group';

export class FeatureService {

    constructor(private featureRepository: IFeatureRepository) {

    }

    // public status(key: string, consumerId: string): Promise<boolean> {
    //     const self = this;

    //     return co(function* () {

    //         const feature: Feature = yield self.featureRepository.findByKey(key);

    //         if (feature === null) {
    //             return null;
    //         }

    //         if (feature.status === true) {
    //             return true;
    //         }

    //         return false;
    //     });
    // }

    public find(key: string): Promise<Feature> {
        return this.featureRepository.findByKey(key);
    }

    public list(projectKey: string): Promise<Feature[]> {
        return this.featureRepository.listByProjectKey(projectKey);
    }

    public create(name: string, key: string, type: string, projectKey: string): Promise<Feature> {
        const self = this;

        return co(function*(){

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (feature !== null) {
                return null;
            }

            const newFeature: Feature = new Feature(key, name, type, [], new AssociatedProject(projectKey, null));

            const success: boolean = yield self.featureRepository.create(newFeature);

            return newFeature;
        });
    }

    public toggle(key: string): Promise<boolean> {
        const self = this;

        return co(function*(){

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (feature === null) {
                return false;
            }

            feature.toggle();

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }

    public assignGroups(key: string, groupKeys: string[]): Promise<boolean> {
        const self = this;

        return co(function*(){

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (feature === null) {
                return false;
            }

            for (const k of groupKeys) {
                feature.assignGroup(new FeatureGroup(k, null));
            }

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }

    public deassignGroups(key: string, groupKeys: string[]): Promise<boolean> {
        const self = this;

        return co(function*(){

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (feature === null) {
                return false;
            }

            for (const k of groupKeys) {
                feature.deassignGroup(new FeatureGroup(k, null));
            }

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }
}
