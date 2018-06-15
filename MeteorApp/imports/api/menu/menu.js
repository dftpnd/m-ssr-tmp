import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Menu = new Mongo.Collection('Menu'); // eslint-disable-line

Menu.deny({
    insert() {
        return false;
    },
    update() {
        return false;
    },
    remove() {
        return false;
    }
});

Menu.schema = new SimpleSchema({
    name: { type: String },
    composition: { type: String },
    price: { type: Number, defaultValue: 0 },
    group: { type: Number, defaultValue: 0 }
});

Menu.attachSchema(Menu.schema);
