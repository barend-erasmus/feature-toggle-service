// Imports models
import { AssociatedProject } from './associated-project';
import { Environment } from './environment';

export class Feature {

    public enabled: boolean = false;

    constructor(
        public key: string,
        public name: string,
        public type: string,
        public associatedProject: AssociatedProject,
        public environments: Environment[],
        public createdTimestamp: number) {

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

        if (this.environments === null) {
            return false;
        }

        return true;
    }

    public toggle(): Feature {

        this.enabled = !this.enabled;

        return this;
    }
}
