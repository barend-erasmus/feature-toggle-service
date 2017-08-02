export class Option {
    constructor(public key: string, public name: string, public value: string) {

    }

    public isValid(): boolean {

        if (this.key === null) {
            return false;
        }
        
        return true;
    }
}
