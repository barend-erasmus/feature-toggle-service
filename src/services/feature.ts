// Imports
import * as co from 'co';
import * as uuid from 'uuid';

// Imports interfaces
import { IFeatureRepository } from './../repositories/feature';
import { IGroupRepository } from './../repositories/group';
import { IProjectRepository } from './../repositories/project';

// Imports models
import { AssociatedProject } from './../models/associated-project';
import { Feature } from './../models/feature';
import { FeatureGroup } from './../models/feature-group';
import { Group } from './../models/group';
import { Option } from './../models/option';
import { Project } from './../models/project';
import { Environment } from './../models/environment';

export class FeatureService {

    constructor(private featureRepository: IFeatureRepository, private projectRepository: IProjectRepository, private groupRepository: IGroupRepository) {

    }

    public enabled(key: string, consumerId: string, environmentKey: string, type: string): Promise<boolean> {
        const self = this;

        return co(function* () {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (!feature) {
                return false;
            }

            if (feature.enabled === false) {
                return false;
            }

            const environment: Environment = feature.environments.find((environment) => environment.key === environmentKey);

            if (!environment) {
                return false;
            }

            for (const featureGroup of environment.groups) {
                const group: Group = yield self.groupRepository.findByKey(featureGroup.key);

                const index = group.consumers.findIndex((x) => x.id === consumerId);

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
        if (!projectKey) {
            return this.featureRepository.list();
        } else {
            return this.featureRepository.listByProjectKey(projectKey);
        }
    }

    public create(name: string, key: string, type: string, projectKey: string): Promise<Feature> {
        const self = this;

        return co(function* () {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (feature) {
                return null;
            }

            const newFeature: Feature = new Feature(key, name, type, new AssociatedProject(projectKey, null, null), [
                new Environment('development', 'Development', [], [], new Date().getTime()),
                new Environment('staging', 'Staging', [], [], new Date().getTime()),
                new Environment('live', 'Live', [], [], new Date().getTime())
            ], new Date().getTime());

            if (!newFeature.isValid()) {
                return null;
            }

            if (!newFeature.associatedProject.isValid()) {
                return null;
            }

            const project: Project = yield self.projectRepository.findByKey(newFeature.associatedProject.key);

            if (!project) {
                return null;
            }

            const success: boolean = yield self.featureRepository.create(newFeature);

            return newFeature;
        });
    }

    public toggle(key: string): Promise<boolean> {
        const self = this;

        return co(function* () {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (!feature) {
                return false;
            }

            feature.toggle();

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }

    public assignGroups(key: string, environmentKey: string, groupKeys: string[]): Promise<boolean> {

        const self = this;

        return co(function* () {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (!feature) {
                return false;
            }

            for (const k of groupKeys) {

                const featureGroup: FeatureGroup = new FeatureGroup(k, null, null);

                if (!featureGroup.isValid()) {
                    return false;
                }

                const environment: Environment = feature.environments.find((environment) => environment.key === environmentKey);

                if (!environment) {
                    return false;
                }

                environment.assignGroup(featureGroup);
            }

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }

    public deassignGroups(key: string, environmentKey: string, groupKeys: string[]): Promise<boolean> {
        const self = this;

        return co(function* () {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (!feature) {
                return false;
            }

            for (const k of groupKeys) {

                const featureGroup: FeatureGroup = new FeatureGroup(k, null, null);

                if (!featureGroup.isValid()) {
                    return false;
                }

                const environment: Environment = feature.environments.find((environment) => environment.key === environmentKey);

                if (!environment) {
                    return false;
                }

                environment.deassignGroup(featureGroup);
            }

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }

    public addOptions(key: string, environmentKey: string, options: Option[]): Promise<boolean> {
        const self = this;

        return co(function* () {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (!feature) {
                return false;
            }

            for (const k of options) {

                if (!k) {
                    return false;
                }

                const option: Option = new Option(k.key, k.name, k.value);

                const environment: Environment = feature.environments.find((environment) => environment.key === environmentKey);

                if (!environment) {
                    return false;
                }

                environment.addOption(option);
            }

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }

    public removeOptions(key: string, environmentKey: string, optionKeys: string[]): Promise<boolean> {
        const self = this;

        return co(function* () {

            const feature: Feature = yield self.featureRepository.findByKey(key);

            if (!feature) {
                return false;
            }

            for (const k of optionKeys) {

                const option: Option = new Option(k, null, null);

                if (!option.isValid()) {
                    return false;
                }

                const environment: Environment = feature.environments.find((environment) => environment.key === environmentKey);

                if (!environment) {
                    return false;
                }

                environment.removeOption(option);
            }

            const success: boolean = yield self.featureRepository.update(feature);

            return true;
        });
    }
}
