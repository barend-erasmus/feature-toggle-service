// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IFeatureRepository } from './../repositories/feature';
import { IProjectRepository } from './../repositories/project';
import { IGroupRepository } from './../repositories/group';

// Imports models
import { AssociatedProject } from './../models/associated-project';
import { Feature } from './../models/feature';
import { FeatureGroup } from './../models/feature-group';
import { Project } from './../models/project';
import { Group } from './../models/group';

export class FeatureService {

    constructor(private featureRepository: IFeatureRepository, private projectRepository: IProjectRepository, private groupRepository: IGroupRepository) {

    }

    public status(key: string, consumerId: string): Promise<boolean> {
        const self = this;

        return co(function* () {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (feature === null) {
                return null;
            }

            if (feature.status === false) {
                return false;
            }

            for (const featureGroup of feature.groups) {
                const group: Group = yield self.groupRepository.findByKey(featureGroup.key);

                const index = this.consumers.findIndex((x) => x.id === consumerId);

                if (index > -1) {
                    return true;
                }
            }

            return false;
        });
    }

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

            if (!newFeature.isValid()) {
                return null;
            }

            if (!newFeature.associatedProject.isValid()) {
                return null;
            }

            const project: Project = yield self.projectRepository.findByKey(newFeature.associatedProject.key);

            if (project === null) {
                return null;
            }

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
                const featureGroup: FeatureGroup = new FeatureGroup(k, null);

                if (!featureGroup.isValid()) {
                    return false;
                }

                feature.assignGroup(featureGroup);
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
                 const featureGroup: FeatureGroup = new FeatureGroup(k, null);

                 if (!featureGroup.isValid()) {
                    return false;
                }

                 feature.deassignGroup(featureGroup);
            }

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }
}
