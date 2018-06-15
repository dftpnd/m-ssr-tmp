import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Accounts } from './accounts';

export const accountsFind = new ValidatedMethod({
    name: 'accounts.methods.getUser',
    validate: new SimpleSchema({ email: { type: String } }).validator(),
    run({ email }) {
        return Accounts.findOne({ email });
    }
});

export const accountsReg = new ValidatedMethod({
    name: 'accounts.methods.reg',
    validate: new SimpleSchema({ email: { type: String }, password: { type: String } }).validator(),
    run({ email, password }) {
        return Accounts.insert({ email, password });
    }
});
