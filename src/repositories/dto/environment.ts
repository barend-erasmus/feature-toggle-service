// Imports models
import { OptionDto } from './option';

export class EnvironmentDto {
    constructor(
        public key: string,
        public name: string,
        public groupKeys: string[],
        public options: OptionDto[],
        public createdTimestamp: number
    ) {

    }
}