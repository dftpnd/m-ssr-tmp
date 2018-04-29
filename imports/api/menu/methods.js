import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Menu } from './menu';

export default new ValidatedMethod({
    name: 'menu.methods.getAll',
    validate: new SimpleSchema({}).validator(),
    run() {
        return Menu.find().fetch();
    }
});
