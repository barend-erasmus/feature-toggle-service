// Imports
import { Consumer } from './../models/consumer';

export class Group {
    constructor(public key: string, public name: string, public consumers: Consumer[]) {

    }

    public assignConsumer(consumer: Consumer): boolean {

        this.consumers.push(consumer);

        return true;
    }

     public deassignConsumer(consumer: Consumer): boolean {

        const index = this.consumers.findIndex((x) => x.id === consumer.id);

        if (index > -1) {
            this.consumers.splice(index, 1);
        }

        return true;
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
