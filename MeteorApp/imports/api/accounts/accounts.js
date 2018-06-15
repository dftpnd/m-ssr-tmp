import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Accounts = new Mongo.Collection('Accounts'); // eslint-disable-line

Accounts.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return false;
    }
});

Accounts.schema = new SimpleSchema({
    email: { type: String },
    password: { type: String }
});

Accounts.attachSchema(Accounts.schema);
