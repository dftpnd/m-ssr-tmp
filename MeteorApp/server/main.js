import { WebApp } from 'meteor/webapp';
import i18n from 'meteor/universe:i18n';

import '../imports/startup/server';

i18n.setOptions({ defaultLocale: 'ru-RU' });

WebApp.addHtmlAttributeHook(() => ({ lang: 'ru' }));

WebApp.connectHandlers.use((req, res, next) => {
    const cookies = req.Cookies;

    if (cookies.has('locale')) {
        i18n.setLocale(cookies.get('locale'));
        WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));
    }

    next();
});
