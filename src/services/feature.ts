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
}
