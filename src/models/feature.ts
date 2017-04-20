// Imports models
import { AssociatedProject } from './associated-project';
import { FeatureGroup } from './feature-group';

export class Feature {

    public status: boolean = false;

    constructor(public key: string, public name: string, public type: string, public groups: FeatureGroup[], public associatedProject: AssociatedProject) {

    }

    public isValid(): boolean {

        if (this.groups === null) {
            return false;
        }

        return true;
    }
}
