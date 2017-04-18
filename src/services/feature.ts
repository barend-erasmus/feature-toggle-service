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

    public list(projectId: string): Promise<Feature[]> {
        return this.featureRepository.listByProjectId(projectId);
    }

    public create(name: string, key: string): Promise<Feature> {
        const self = this;
        
        return co(function*() {
            const id = uuid.v4();
            
            const findByKeyResult: Feature = yield self.featureRepository.findByKey(key);

            if (findByKeyResult !== null) {
                return null;
            }

            const createResult: boolean = yield self.featureRepository.create(id, name, key);
            return new Feature(id, name, key);
        });
    }

    public assignUsers(featureId: string, listOfUserId: string[]): Promise<boolean> {
        return null;
    }

    public assignUserGroup(featureId: string, userGroupId: string): Promise<boolean> {
        return null;
    }
}
