import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Orders = new Mongo.Collection('Orders'); // eslint-disable-line

Orders.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

Orders.schema = new SimpleSchema({
    name: { type: String }
    // choice: { type: Array }
    // form: { type: Object }
});

Orders.attachSchema(Orders.schema);
