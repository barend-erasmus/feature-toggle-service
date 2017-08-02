// Imports models
import { EnvironmentDto } from './environment';

export class FeatureDto {
    constructor(
        public key: string,
        public name: string,
        public type: string,
        public enabled: boolean,
        public associatedProjectKey: string,
        public environments: EnvironmentDto[],
        public createdTimestamp: number) {

    }
}