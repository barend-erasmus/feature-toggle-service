// Imports
import * as co from 'co';
import * as mongo from 'mongodb';

// Imports interfaces
import { IFeatureRepository } from './../feature';

// Imports models
import { AssociatedProject } from './../../models/associated-project';
import { Feature } from './../../models/feature';
import { FeatureGroup } from './../../models/feature-group';
import { Environment } from './../../models/environment';
import { Option } from './../../models/option';

// Imports dto
import { FeatureDto } from './../dto/feature';
import { EnvironmentDto } from './../dto/environment';
import { ProjectDto } from './../dto/project';
import { OptionDto } from './../dto/option';
import { GroupDto } from './../dto/group';

export class FeatureRepository implements IFeatureRepository {

    constructor(private uri: string) {

    }

    public listByProjectKey(key: string): Promise<Feature[]> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const features: FeatureDto[] = yield collection.find({
                associatedProjectKey: key,
            }).toArray();

            db.close();

            const featuresResult: Feature[] = yield features.map((feature) => self.loadFeature(feature));

            return featuresResult;
        });
    }

    public list(): Promise<Feature[]> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const features: FeatureDto[] = yield collection.find({}).toArray();

            db.close();

            const featuresResult: Feature[] = yield features.map((feature) => self.loadFeature(feature));

            return featuresResult;
        });
    }

    public findByKey(key: string): Promise<Feature> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const feature: FeatureDto = yield collection.findOne({
                key,
            });

            db.close();

            if (!feature) {
                return null;
            }

            const featureResult: Feature = yield self.loadFeature(feature);

            return featureResult;
        });
    }

    public create(feature: Feature): Promise<boolean> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const result = yield collection.insertOne(new FeatureDto(
                feature.key,
                feature.name,
                feature.type,
                feature.enabled,
                feature.associatedProject.key,
                feature.environments.map((environment) => new EnvironmentDto(
                    environment.key,
                    environment.name,
                    environment.groups.map((group) => group.key),
                    environment.options.map((option) => new OptionDto(option.key, option.name, option.value)),
                    environment.createdTimestamp
                )),
                feature.createdTimestamp
            ));

            db.close();

            return true;
        });
    }

    public update(feature: Feature): Promise<boolean> {

        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const result = yield collection.updateOne({
                key: feature.key,
            }, {
                    $set: {
                        enabled: feature.enabled,
                        environments: feature.environments.map((environment) => new EnvironmentDto(
                            environment.key,
                            environment.name,
                            environment.groups.map((group) => group.key),
                            environment.options.map((option) => new OptionDto(option.key, option.name, option.value)),
                            environment.createdTimestamp
                        ))
                    },
                });

            db.close();

            return true;
        });
    }

    private loadFeature(featureDto: FeatureDto): Promise<Feature> {
        const self = this;

        return co(function* () {

            const feature: Feature = new Feature(featureDto.key, featureDto.name, featureDto.type, null, [], featureDto.createdTimestamp);
            feature.enabled = featureDto.enabled;


            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const groupsCollection: mongo.Collection = db.collection('groups');
            const projectsCollection: mongo.Collection = db.collection('projects');

            // Load AssociatedProject
            const project: ProjectDto = yield projectsCollection.findOne({
                key: featureDto.associatedProjectKey
            });

            feature.associatedProject = new AssociatedProject(project.key, project.name, project.createdTimestamp);

            // Load Environments
            for (const environmentDto of featureDto.environments) {

                const environment: Environment = new Environment(environmentDto.key, environmentDto.name, [], [], environmentDto.createdTimestamp);

                // Load FeatureGroups
                for (const groupKey of environmentDto.groupKeys) {

                    const group: GroupDto = yield groupsCollection.findOne({
                        key: groupKey
                    });

                    environment.groups.push(new FeatureGroup(group.key, group.name, group.createdTimestamp));
                }

                // Load Options
                environment.options = environmentDto.options.map((option) => new Option(option.key, option.name, option.value));
                
                feature.environments.push(environment);
            }

            db.close();

            return feature;
        });
    }
}
