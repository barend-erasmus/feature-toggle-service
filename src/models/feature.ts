// Imports models
import { FeatureGroup } from './feature-group';
import { AssociatedProject } from './associated-project';

export class Feature {

    public status: boolean = false;

    constructor(public key: string, public name: string, type: string, public groups: FeatureGroup[], public associatedProject: AssociatedProject) {

    }

    public isValid(): boolean {
        return true;
    }
}
