import { Meteor } from 'meteor/meteor';
import { TelegramBot } from 'meteor/benjick:telegram-bot';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

import '../../api/todos/todos';
import '../../api/todos/methods';
import '../../api/menu/menu';
import '../../api/menu/methods';
import '../../api/accounts/accounts';
import '../../api/accounts/methods';

Meteor.methods({
    async getGeo(geocode) {
        check(geocode, String);
        const escapeGeocode = encodeURIComponent(geocode);
        const url = `https://geocode-maps.yandex.ru/1.x?format=json&geocode=${escapeGeocode}`;
        const res = await HTTP.get(url);
        return res;
    },
    async telegramSend(order) {
        check(order, String);

        return TelegramBot.send(order, '@daftpandwork', true);
    }
});

Meteor.startup(() => {
    TelegramBot.token = Meteor.settings.TELEGRAM_TOKEN || '';
});
