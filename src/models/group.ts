// Imports
import { Consumer } from './../models/consumer';

export class Group {
    constructor(public key: string, public name: string, public consumers: Consumer[]) {

    }

    public isValid(): boolean {
        return true;
    }
}
