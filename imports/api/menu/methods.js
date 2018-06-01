import { HTTP } from 'meteor/http';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Menu } from './menu';

export const menuGetAll = new ValidatedMethod({
    name: 'menu.methods.getAll',
    validate: new SimpleSchema({}).validator(),
    run() {
        return Menu.find().fetch();
    }
});

export const address = () => {
    // const geocode = HTTP.get('https://geocode-maps.yandex.ru/1.x');

    HTTP.call(
        'get',
        'https://geocode-maps.yandex.ru/1.x?geocode=kazan',
        {
            // content: 'xml'
            // data: { geocode: 'казань' }
        },
        (error, result) => {
            if (!error) {
                console.log('address HELLO SERVER', result);
            }
        }
    );
};
