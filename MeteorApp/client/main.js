/* global Meteor */
import i18n from 'meteor/universe:i18n';
import { Cookies } from 'meteor/ostrio:cookies';

import '../imports/startup/client';

i18n.setOptions({ defaultLocale: 'ru-RU' });
const cookies = new Cookies();

if (cookies.has('locale')) {
    i18n.setLocale(cookies.get('locale'));
}

Meteor.startup(() => {
    // document.body.className += ' ' + 'js-body';

    navigator.serviceWorker
        .register('/sw.js')
        .then()
        .catch(error => console.log('ServiceWorker registration failed: ', error));
});
