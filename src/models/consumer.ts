export class Consumer {
    constructor(public id: string, public displayName: string, public type: string) {

    }

    public isValid(): boolean {

        if (this.id === null) {
            return false;
        }

        return true;
    }
}
