// Imports
import * as co from 'co';
import * as mongo from 'mongodb';

// Imports interfaces
import { IFeatureRepository } from './../feature';

// Imports models
import { AssociatedProject } from './../../models/associated-project';
import { Feature } from './../../models/feature';
import { FeatureGroup } from './../../models/feature-group';

export class FeatureRepository implements IFeatureRepository {

    constructor(private uri: string) {

    }

    public listByProjectKey(key: string): Promise<Feature[]> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const features: any[] = yield collection.find({
                projectKey: key,
            }).toArray();

            db.close();

            let featuresResult: Feature[] = features.map((x) => {
                const groups: FeatureGroup[] = x.groups.map((y) => new FeatureGroup(y.key, null, null));

                const feature: Feature = new Feature(x.key, x.name, x.type, groups, new AssociatedProject(x.projectKey, null, null), x.createdTimestamp, x.options);

                feature.enabled = x.enabled;

                return feature;
            });

            featuresResult = yield self.loadGroupsForFeatures(featuresResult);
            featuresResult = yield self.loadAssociatedProjectForFeatures(featuresResult);

            return featuresResult;
        });
    }

    public list(): Promise<Feature[]> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const features: any[] = yield collection.find({}).toArray();

            db.close();

            let featuresResult: Feature[] = features.map((x) => {
                const groups: FeatureGroup[] = x.groups.map((y) => new FeatureGroup(y.key, null, null));

                const feature: Feature = new Feature(x.key, x.name, x.type, groups, new AssociatedProject(x.projectKey, null, null), x.createdTimestamp, x.options);

                feature.enabled = x.enabled;

                return feature;
            });

            featuresResult = yield self.loadGroupsForFeatures(featuresResult);
            featuresResult = yield self.loadAssociatedProjectForFeatures(featuresResult);

            return featuresResult;
        });
    }

    public findByKey(key: string): Promise<Feature> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const feature: any = yield collection.findOne({
                key,
            });

            db.close();

            if (feature === null) {
                return null;
            }

            const groups: FeatureGroup[] = feature.groups.map((y) => new FeatureGroup(y.key, null, null));

            let featureResult: Feature = new Feature(feature.key, feature.name, feature.type, groups, new AssociatedProject(feature.projectKey, null, null), feature.createdTimestamp, feature.options);

            featureResult.enabled = feature.enabled;

            featureResult = yield self.loadGroupsForFeature(featureResult);
            featureResult = yield self.loadAssociatedProjectForFeature(featureResult);

            return featureResult;
        });
    }

    public create(feature: Feature): Promise<boolean> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const result = yield collection.insertOne({
                groups: feature.groups,
                key: feature.key,
                name: feature.name,
                projectKey: feature.associatedProject.key,
                enabled: feature.enabled,
                type: feature.type,
                createdTimestamp: feature.createdTimestamp,
                options: feature.options
            });

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
                        groups: feature.groups,
                        enabled: feature.enabled,
                        options: feature.options
                    },
                });

            db.close();

            return true;
        });
    }

    private loadGroupsForFeatures(features: Feature[]): Promise<Feature[]> {
        const self = this;
        return co(function* () {
            return yield features.map((x) => self.loadGroupsForFeature(x));
        });

    }

    private loadGroupsForFeature(feature: Feature): Promise<Feature> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const groups: any[] = yield feature.groups.map((x) => collection.findOne({
                key: x.key,
            }));

            db.close();

            feature.groups = groups.filter((x) => x !== null).map((x) => new FeatureGroup(x.key, x.name, x.createdTimestamp));

            return feature;
        });
    }

    private loadAssociatedProjectForFeatures(features: Feature[]): Promise<Feature[]> {
        const self = this;
        return co(function* () {
            return yield features.map((x) => self.loadAssociatedProjectForFeature(x));
        });
    }

    private loadAssociatedProjectForFeature(feature: Feature): Promise<Feature> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('projects');

            const project: any = yield collection.findOne({
                key: feature.associatedProject.key,
            });

            db.close();

            feature.associatedProject = new AssociatedProject(project.key, project.name, project.createdTimestamp);

            return feature;
        });
    }
}
