// Imports models
import { User } from './user';

export class Feature {

    public status: boolean = false;

    constructor(public id: string, public name: string, public key: string) {

    }
}
