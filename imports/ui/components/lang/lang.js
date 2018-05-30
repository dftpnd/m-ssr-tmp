import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Cookies } from 'meteor/ostrio:cookies';

const cookies = new Cookies();

const setLang = locale => {
    cookies.set('locale', locale);
    i18n.setLocale(locale);
};

const Lang = () => {
    return (
        <ul>
            <li>
                <button onClick={() => setLang('ru-RU')} type="button">
                    ru{' '}
                    <span role="img" aria-label="ru">
                        🇷🇺
                    </span>
                </button>
            </li>
            <li>
                <button onClick={() => setLang('en-US')} type="button">
                    en{' '}
                    <span role="img" aria-label="en">
                        🇺🇸
                    </span>
                </button>
            </li>
        </ul>
    );
};

export default Lang;
