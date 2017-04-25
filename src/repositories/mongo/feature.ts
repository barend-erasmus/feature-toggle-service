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

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const features: any[] = yield collection.find({
                projectKey: key,
            }).toArray();

            db.close();

            let featuresResult: Feature[] = features.map((x) => {
                const groups: FeatureGroup[] = x.groups.map((y) => new FeatureGroup(y.key, y.name));

                const feature: Feature = new Feature(x.key, x.name, x.type, groups, new AssociatedProject(x.projectKey, null));

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

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const feature: any = yield collection.findOne({
                key,
            });

            db.close();

            if (feature === null) {
                return null;
            }

            const groups: FeatureGroup[] = feature.groups.map((y) => new FeatureGroup(y.key, y.name));

            let featureResult: Feature = new Feature(feature.key, feature.name, feature.type, groups, new AssociatedProject(feature.projectKey, null));

            featureResult.enabled = feature.enabled;

            featureResult = yield self.loadGroupsForFeature(featureResult);
            featureResult = yield self.loadAssociatedProjectForFeature(featureResult);

            return featureResult;
        });
    }

    public create(feature: Feature): Promise<boolean> {
        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const result = yield collection.insertOne({
                groups: feature.groups,
                key: feature.key,
                name: feature.name,
                projectKey: feature.associatedProject.key,
                status: feature.enabled,
                type: feature.type,
            });

            db.close();

            return true;
        });
    }

    public update(feature: Feature): Promise<boolean> {

        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const result = yield collection.updateOne({
                key: feature.key,
            }, {
                $set: {
                    groups: feature.groups,
                    status: feature.enabled,
                },
            });

            db.close();

            return true;
        });
    }

    private loadGroupsForFeatures(features: Feature[]): Promise<Feature[]> {
        const self = this;
        return co(function*() {
            return yield features.map((x) => self.loadGroupsForFeature(x));
        });

    }

    private loadGroupsForFeature(feature: Feature): Promise<Feature> {
        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const groups: any[] = yield feature.groups.map((x) => collection.findOne({
                key: x.key,
            }));

            db.close();

            feature.groups = groups.filter((x) => x !== null).map((x) => new FeatureGroup(x.key, x.name));

            return feature;
        });
    }

    private loadAssociatedProjectForFeatures(features: Feature[]): Promise<Feature[]> {
        const self = this;
        return co(function*() {
            return yield features.map((x) => self.loadAssociatedProjectForFeature(x));
        });
    }

    private loadAssociatedProjectForFeature(feature: Feature): Promise<Feature> {
        const self = this;

        return co(function*() {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('projects');

            const project: any = yield collection.findOne({
                key: feature.associatedProject.key,
            });

            db.close();

            feature.associatedProject = new AssociatedProject(project.key, project.name);

            return feature;
        });
    }
}
