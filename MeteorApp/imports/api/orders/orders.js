import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Orders = new Mongo.Collection('Orders'); // eslint-disable-line

Orders.deny({
    insert() {
        return true;
    },
    update() {
        return false;
    },
    remove() {
        return false;
    }
});

Orders.schema = new SimpleSchema({
    date: { type: String }
    // choice: { type: Array }
    // form: { type: Object }
});

Orders.attachSchema(Orders.schema);
