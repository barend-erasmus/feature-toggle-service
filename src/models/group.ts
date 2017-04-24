// Imports
import { Consumer } from './../models/consumer';

export class Group {
    constructor(public key: string, public name: string, public consumers: Consumer[]) {

    }

    public isValid(): boolean {

        if (this.key === null) {
            return false;
        }

        if (this.name === null) {
            return false;
        }

        if (this.consumers === null) {
            return false;
        }

        return true;
    }
}
