import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Orders } from './orders';

export const ordersFind = new ValidatedMethod({
    name: 'orders.methods.getOrder',
    validate: new SimpleSchema({ email: { type: String } }).validator(),
    run({ email }) {
        return Orders.findOne({ email });
    }
});

export const ordersCreate = new ValidatedMethod({
    name: 'orders.methods.add',
    validate: new SimpleSchema({ date: { type: String } }).validator(),
    run({ date }) {
        console.log('ordersCreate {date}', date);
        return Orders.insert({ name: date });
    }
});
