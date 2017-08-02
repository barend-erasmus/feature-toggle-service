// Imports models
import { FeatureGroup } from './feature-group';
import { Option } from './option';

export class Environment {
    constructor(
        public key: string, 
        public name: string,
        public groups: FeatureGroup[],
        public options: Option[],
        public createdTimestamp: number
    ) {

    }

    public isValid(): boolean {

        if (this.groups === null) {
            return null;
        }

        if (this.options === null) {
            return false;
        }

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

    public addOption(option: Option): boolean {

        this.options.push(option);

        return true;
    }

    public removeOption(option: Option): boolean {

        const index = this.options.findIndex((x) => x.key === option.key);

        if (index > -1) {
            this.options.splice(index, 1);
        }

        return true;
    }
}