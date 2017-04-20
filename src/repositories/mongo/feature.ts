// Imports
import * as co from 'co';
import * as mongo from 'mongodb';

// Imports interfaces
import { IFeatureRepository } from './../feature';

// Imports models
import { Feature } from './../../models/feature';
import { FeatureGroup } from './../../models/feature-group';
import { AssociatedProject } from './../../models/associated-project';

export class FeatureRepository implements IFeatureRepository {

    constructor(private uri: string) {

    }

    public listByProjectKey(key: string): Promise<Feature[]> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const features: any[] = yield collection.find({
                projectKey: key
            }).toArray();


            db.close();

            let featuresResult: Feature[] = features.map((x) => {
                const groups: FeatureGroup[] = x.groups.map(y => new FeatureGroup(y, null));

                return new Feature(x.key, x.name, x.type, groups, null);
            });

            featuresResult = yield self.loadGroupsForFeatures(featuresResult);
            featuresResult = yield self.loadAssociatedProjectForFeatures(featuresResult);

            return featuresResult;
        });
    }

    public findByKey(key: string): Promise<Feature> {
        throw new Error('Not Implemented Yet!');
    }

    public create(feature: Feature): Promise<boolean> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('features');

            const result = yield collection.insertOne({
                key: feature.key,
                name: feature.name,
                groups: feature.groups.map(x => x.key),
                status: feature.status,
                projectKey: feature.associatedProject.key,
                type: feature.type
            });

            db.close();

            return true;
        });
    }

    private loadGroupsForFeatures(features: Feature[]): Promise<Feature[]> {
        const self = this;
        return co(function* () {
            return yield features.map(x => self.loadGroupsForFeature(x));
        });
    }

    private loadGroupsForFeature(feature: Feature): Promise<Feature> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('groups');

            const groups: any[] = yield feature.groups.map(x => collection.findOne({
                key: x.key
            }));

            db.close();

            feature.groups = groups.map(x => new FeatureGroup(x.key, x.name));

            return feature;
        });
    }

    private loadAssociatedProjectForFeatures(features: Feature[]): Promise<Feature[]> {
        const self = this;
        return co(function* () {
            return yield features.map(x => self.loadAssociatedProjectForFeature(x));
        });
    }

    private loadAssociatedProjectForFeature(feature: Feature): Promise<Feature> {
        const self = this;

        return co(function* () {
            const db: mongo.Db = yield mongo.MongoClient.connect(self.uri);

            const collection: mongo.Collection = db.collection('projects');

            const project: any = yield collection.findOne({
                key: feature.associatedProject.key
            })

            db.close();

            feature.associatedProject = new AssociatedProject(project.key, project.name);

            return feature;
        });
    }
}
