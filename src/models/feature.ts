// Imports models
import { AssociatedProject } from './associated-project';
import { FeatureGroup } from './feature-group';

export class Feature {

    public status: boolean = false;

    constructor(public key: string, public name: string, public type: string, public groups: FeatureGroup[], public associatedProject: AssociatedProject) {

    }

    public isValid(): boolean {

        if (this.key === null) {
            return null;
        }

        if (this.name === null) {
            return null;
        }

        if (this.type === null) {
            return null;
        }

        if (this.associatedProject === null) {
            return null;
        }

        if (this.groups === null) {
            return false;
        }

        return true;
    }

    public toggle(): boolean {

        this.status = !this.status;

        return true;
    }

    public assignGroup(group: FeatureGroup): boolean {

        this.groups.push(group);

        return true;
    }

    public deassignGroup(group: FeatureGroup): boolean {

        const index = this.groups.findIndex((x) => x.key === group.key);

        if (index > -1) {
            this.groups.splice(index, 1);
        }

        return true;
    }
}
