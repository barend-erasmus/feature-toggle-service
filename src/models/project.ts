export class Project {
    constructor(public key: string, public name: string) {

    }

    public isValid(): boolean {
        return true;
    }
}
