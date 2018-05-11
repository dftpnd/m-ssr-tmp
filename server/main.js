import '../imports/startup/server';
import { WebApp } from 'meteor/webapp';
import i18n from 'meteor/universe:i18n';
i18n.setLocale('ru-RU');
i18n.setOptions({
    defaultLocale: 'ru-RU'
});

WebApp.addHtmlAttributeHook(() => ({ lang: 'ru' }));
