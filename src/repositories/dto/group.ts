export class GroupDto {
    constructor(
        public key: string,
        public name: string,
        public consumerKeys: string[],
        public createdTimestamp: number) {

    }
}